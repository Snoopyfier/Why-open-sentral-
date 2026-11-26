console.log("omnibox.js");

// Save default API suggestions
browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason == 'install'){
        browser.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        });
    };
});

const URL_CHROME_EXTENSIONS_DOC = 
    'https://developer.chrome.com/docs/extensions/reference/';
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

//DISPLAY SUGGESTIONS AFTER USER STARTS TYPING
browser.omnibox.onInputChanged.addListener(async (input, suggest) => {
    await browser.omnibox.setDefaultSuggestions({
        description: 'Enter chrome api or choose from past searches'
    });
    const{ apiSuggestions } = await browser.storage.local.get('apiSuggestions')
    const suggestions = apiSuggestions.map((api) => {
        return {content: api, description: "Open browser.${api} API"}
    });
    suggest(suggestions);
});
