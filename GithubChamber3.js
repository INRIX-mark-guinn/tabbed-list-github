define(function(require) {
    'use strict';

    const
        IDA = require('common/InternetDataAccessAPI'),
        ListDataHandlerBase = require('common/platform/ListDataHandlerBase'),
        TabbedListChamber = require('common/platform/chamber/TabbedListChamber');


    class GithubListDataHandler extends ListDataHandlerBase {
        parseFetchedResponse (node, respData) {
            // NOTE: this approach doesn't really support chunking/infinite scroll very well, so we just ignore the
            // total count and return an array instead of an object in the form {totalCount, items}
            return respData.items.map(item => {
                return {
                    key:       item.id,
                    issuesUrl: item.issues_url,
                    text:      [item.full_name, item.description],
                    icon:      item.owner.avatar_url,
                }
            });
        }
    }


    return class extends TabbedListChamber {
        getListConfig() {
            return {
                // This approach doesn't really support paging very well
                // dataChunkAutoLoad:true,
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
                        url: 'https://api.github.com/search/repositories?sort=starts&order=desc&q=user:google'
                    }
                },
                {
                    text: 'Facebook',
                    enabled: true,
                    fetchInfo: {
                        url: 'https://api.github.com/search/repositories?sort=starts&order=desc&q=user:facebook'
                    }
                },
                {
                    text: 'Recent',
                    enabled: true,
                    fetchInfo: {
                        url: 'https://api.github.com/search/repositories?sort=starts&order=desc&q=created:>2016-07-01'
                    }
                },
            ];
        }
    }
});
