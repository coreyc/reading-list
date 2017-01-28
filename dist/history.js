'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var dict, includeUrl, removeUrl, getBaseUrl, addCurrentPageToDict, getTodaysDate, searchChromeHistory, strBuilder, listFormatter, createRegexFromDict, isMatch, getMatchedItems, getTitle, getTitlesFromHistory, createList, limiter;
    return {
        setters: [],
        execute: function () {
            dict = ['medium.com', 'quora.com', 'nytimes.com', 'cnn.com', 'newsweek.com', 'blog', 'topic'];

            includeUrl = function includeUrl() {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                dict.push(item);
            };

            removeUrl = function removeUrl() {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                var index = dict.indexOf(item);
                if (index != -1) {
                    dict.splice(index, 1);
                }
            };

            getBaseUrl = function getBaseUrl() {
                var splitUrl = window.location.href.split('/');
                var baseUrl = splitUrl[2];
                //common for sites to use 'blog' as subdomain, so we include it
                if (splitUrl[3] === 'blog') {
                    return baseUrl + '/' + splitUrl[3];
                }
                return baseUrl;
            };

            addCurrentPageToDict = function addCurrentPageToDict() {
                dict.push(getBaseUrl());
            };

            getTodaysDate = function getTodaysDate() {
                var date = new Date();
                date.setHours(0, 0, 0, 0);
                return date.getTime();
            };

            _export('searchChromeHistory', searchChromeHistory = function searchChromeHistory() {
                return new Promise(function (resolve, reject) {
                    chrome.history.search({
                        'text': '', //empty string returns all,
                        'startTime': getTodaysDate(),
                        'maxResults': 1000000
                    }, function (historyItems) {
                        var list = createList(historyItems);
                        resolve(list);
                    });
                });
            });

            strBuilder = function strBuilder() {
                var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                return a + '|' + b;
            };

            _export('listFormatter', listFormatter = function listFormatter(a, b) {
                return a + '\n' + b;
            });

            createRegexFromDict = function createRegexFromDict() {
                var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                return new RegExp(R.reduce(strBuilder, '', source).slice(1));
            };

            isMatch = function isMatch(item) {
                return R.test(createRegexFromDict(dict), item.url);
            };

            getMatchedItems = R.filter(isMatch);
            getTitle = R.prop('title');
            getTitlesFromHistory = R.compose(R.uniq, R.map(getTitle));
            createList = R.compose(getTitlesFromHistory, getMatchedItems);

            limiter = function limiter(item) {
                //if get multiple url's like url/page-1, url/page-2 need to limit
            };

            _export('listFormatter', listFormatter);

            _export('searchChromeHistory', searchChromeHistory);
        }
    };
});