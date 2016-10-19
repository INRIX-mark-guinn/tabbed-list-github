define(function(require) {
    'use strict';

    const
        IDA = require('common/InternetDataAccessAPI'),
        ListDataHandlerBase = require('common/platform/ListDataHandlerBase'),
        TabbedListChamber = require('common/platform/chamber/TabbedListChamber');

    const PAGE_SIZE = 5;


    class GithubListDataHandler extends ListDataHandlerBase {
        _fetchRepos(userFilter) {
            let node = this.viewContext.nestedListManager.getTreeNode();
            console.log('fetch', node, userFilter);

            if (node.fetchInfo && node.fetchInfo.page < 1) {
                node._data_tree_branch = [{itemType:'loadingPlaceholder'}];
            }

            let filter = userFilter
                ? `q=user:${userFilter}`
                : 'q=created:>2016-07-01'; // we have to have SOME filter, so if no user is given limit by date

            return IDA.fetch(`https://api.github.com/search/repositories?sort=starts&order=desc&${filter}&per_page=${PAGE_SIZE}&page=${node.fetchInfo.page + 1}`).then(response => {
                return {
                    totalCount: response.data.total_count,
                    items: response.data.items.map(item => {
                        return {
                            key:       item.id,
                            issuesUrl: item.issues_url,
                            text:      [item.full_name, item.description],
                            icon:      item.owner.avatar_url,
                            // fetchInfo: {
                            //     fetchFunction: fetchIssues
                            // }
                        }
                    })
                }
            });
        }

        fetchGoogle() {
            return this._fetchRepos('google');
        }

        fetchFacebook() {
            return this._fetchRepos('facebook');
        }

        fetchRecent() {
            return this._fetchRepos();
        }
    }


    return class extends TabbedListChamber {
        getListConfig() {
            return {
                dataChunkAutoLoad:true,
            };
        }

        buildContentHandler () {
            return new GithubListDataHandler(this);
        }

        data() {
            return [
                {
                    text: 'Google',
                    selected: true,
                    enabled: true,
                    fetchInfo: {
                        fetchFunction: 'fetchGoogle'
                    }
                },
                {
                    text: 'Facebook',
                    enabled: true,
                    fetchInfo: {
                        fetchFunction: 'fetchFacebook'
                    }
                },
                {
                    text: 'Recent',
                    enabled: true,
                    fetchInfo: {
                        fetchFunction: 'fetchRecent'
                    }
                },
            ];
        }
    }
});
