// listen for checkForWord request, call getTags which includes callback to sendResponse
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === 'checkForWord') {
            checkForWord(request, sender, sendResponse);
            // this is required to use sendResponse asynchronously
            return true;
        }
    }
);

// Returns the index of the first instance of the desired word on the page.
function checkForWord(request, sender, sendResponse) {
    var result = document.getElementById('test');
    if (result) {
        return sendResponse({ results: 1 });
    }
    return sendResponse({ results: 0 });
}