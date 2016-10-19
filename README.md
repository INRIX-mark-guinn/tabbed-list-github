# Tabbed List Github Example

This example displays how to use TabbedListChamber and NestedListManager to load popular
repositories from Github's API, using the tabs as a filter. It gives you three different
examples.

These are not the only ways to use NLM, but they are the simplest that allow a lot of 
functionality without having to dig too deeply into the intricacies of NLM.

### GithubChamber.js

This example shows how to utilize inline lambda functions as fetchFunctions. This is the 
simplest way.
 
### GithubChamber2.js

This example shows how to create a rudimentary delegate object (we call this a Content Handler)
to fetch data for you and then reference those functions in the data tree.

### GithubChamber3.js

This example shows how to use the default url fetching and proved a content handler that
knows how to parse the data.
