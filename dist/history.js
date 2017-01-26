'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, dict, includeUrl, removeUrl, getBaseUrl, getTodaysDate, addCurrentPageToDict, limiter, searchChromeHistory, strBuilder, listFormatter, createRegexFromDict, isMatch, getMatchedItems, getTitle, getTitlePF, getAllHistoryItems, getListLength;

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            dict = ['medium.com', 'quora.com', 'nytimes.com', 'cnn.com', 'newsweek.com', 'blog', 'topic'];

            _export('includeUrl', includeUrl = function includeUrl() {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                dict.push(item);
            });

            _export('removeUrl', removeUrl = function removeUrl() {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

                var index = dict.indexOf(item);
                if (index != -1) {
                    dict.splice(index, 1);
                }
            });

            getBaseUrl = function getBaseUrl() {
                var splitUrl = window.location.href.split('/');
                var baseUrl = splitUrl[2];
                //common for sites to use 'blog' as subdomain, so we include it
                if (splitUrl[3] === 'blog') {
                    return baseUrl + '/' + splitUrl[3];
                }
                return baseUrl;
            };

            getTodaysDate = function getTodaysDate() {
                var date = new Date();
                date.setHours(0, 0, 0, 0);
                return date.getTime();
            };

            _export('addCurrentPageToDict', addCurrentPageToDict = function addCurrentPageToDict() {
                dict.push(getBaseUrl());
            });

            limiter = function limiter(item) {
                //if get multiple url's like url-page-1, url-page-2 need to limit
            };

            _export('searchChromeHistory', searchChromeHistory = function searchChromeHistory() {
                return new Promise(function (resolve, reject) {
                    chrome.history.search({
                        'text': '', //empty string returns all,
                        'startTime': getTodaysDate(),
                        'maxResults': 1000000
                    }, function (historyItems) {
                        var createList = R.compose(R.reduce(listFormatter, ''), R.uniq, R.map(getTitlePF));
                        var list = createList(getMatchedItems(historyItems));
                        resolve(list);
                    });
                });
            });

            strBuilder = function strBuilder() {
                var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                return a + '|' + b;
            };

            listFormatter = function listFormatter(a, b) {
                return a + '\n' + b;
            };

            createRegexFromDict = function createRegexFromDict() {
                var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                return new RegExp(R.reduce(strBuilder, '', source).slice(1));
            };

            isMatch = function isMatch(item) {
                return R.test(createRegexFromDict(dict), item.url);
            };

            getMatchedItems = function getMatchedItems(items) {
                return R.filter(isMatch, items);
            };

            getTitle = function getTitle(item) {
                return R.prop('title', item);
            };

            getTitlePF = R.prop('title');

            _export('getAllHistoryItems', getAllHistoryItems = function getAllHistoryItems(resolve, reject, historyItems) {
                console.log(typeof historyItems === 'undefined' ? 'undefined' : _typeof(historyItems));
                var createList = R.compose(R.reduce(listFormatter, ''), R.uniq, R.map(getTitle));
                var list = createList(getMatchedItems(historyItems));

                console.log(list);
                resolve(list);
            });

            _export('getListLength', getListLength = function getListLength(historyItems) {
                R.compose(R.length, R.uniq, R.map(getTitle));

                var listLength = getListLength(getMatchedItems(historyItems));
                console.log(listLength);
            });

            _export('includeUrl', includeUrl);

            _export('removeUrl', removeUrl);

            _export('addCurrentPageToDict', addCurrentPageToDict);

            _export('searchChromeHistory', searchChromeHistory);

            _export('getAllHistoryItems', getAllHistoryItems);

            _export('getListLength', getListLength);
        }
    };
});