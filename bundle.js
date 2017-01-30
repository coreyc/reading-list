/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _content = __webpack_require__(2);
	
	var content = _interopRequireWildcard(_content);
	
	var _history = __webpack_require__(3);
	
	var history = _interopRequireWildcard(_history);
	
	var _userPrefs = __webpack_require__(5);
	
	var userPrefs = _interopRequireWildcard(_userPrefs);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _history = __webpack_require__(3);
	
	(0, _history.searchChromeHistory)().then(function (list) {
	    var formattedList = R.reduce(_history.listFormatter, '', list);
	
	    //R.map(, formattedList)
	
	    list.map(function (listItem) {
	        document.getElementById('list-area').innerHTML += '<p>' + listItem + '</p>';
	    });
	
	    //document.getElementById('list-area').innerHTML = formattedList
	
	    // escaping the ' character, may need to revisit this in the future if more chars cause encoding issues
	    document.body.innerHTML += "<a class='reading-list' href='data:text;charset=utf-8," + encodeURIComponent(formattedList).replace(/'/g, "%27") + "' download='reading-list'>Download your List</a>";
	
	    document.getElementById('number-read').innerHTML = list.length;
	});
	
	// leaving this here as it tripped me up for a while. DOMContentLoaded did not appear to be firing
	// but apparently content scripts run on their own after the DOM is loaded (at least with 
	// "start_at" set in manifest.json)
	// https://groups.google.com/a/chromium.org/d/msg/chromium-extensions/9bsbgra9QgE/LvbtWPF_QqUJ
	// document.addEventListener('DOMContentLoaded', () => {
	//     DOM code
	// })

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.searchChromeHistory = exports.listFormatter = undefined;
	
	var _ramda = __webpack_require__(4);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var dict = ['medium.com', 'quora.com', 'nytimes.com', 'cnn.com', 'newsweek.com', 'blog', 'topic', 'story', 'article'];
	
	//////////////Impure functions/////////////////
	
	var includeUrl = function includeUrl() {
	    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	    dict.push(item);
	};
	
	var removeUrl = function removeUrl() {
	    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	    var index = dict.indexOf(item);
	    if (index != -1) {
	        dict.splice(index, 1);
	    }
	};
	
	var getBaseUrl = function getBaseUrl() {
	    var splitUrl = window.location.href.split('/');
	    var baseUrl = splitUrl[2];
	    //common for sites to use 'blog' as subdomain, so we include it
	    if (splitUrl[3] === 'blog') {
	        return baseUrl + '/' + splitUrl[3];
	    }
	    return baseUrl;
	};
	
	var addCurrentPageToDict = function addCurrentPageToDict() {
	    dict.push(getBaseUrl());
	};
	
	var getTodaysDate = function getTodaysDate() {
	    var date = new Date();
	    date.setHours(0, 0, 0, 0);
	    return date.getTime();
	};
	
	var searchChromeHistory = function searchChromeHistory() {
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
	};
	
	//////////////(Mostly) pure functions////////////////
	
	var strBuilder = function strBuilder() {
	    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	    return a + '|' + b;
	};
	
	var listFormatter = function listFormatter(a, b) {
	    return a + '\n' + b;
	};
	
	var createRegexFromDict = function createRegexFromDict() {
	    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	    return new RegExp(_ramda2.default.reduce(strBuilder, '', source).slice(1));
	};
	
	var isMatch = function isMatch(item) {
	    return _ramda2.default.test(createRegexFromDict(dict), item.url);
	};
	
	var getMatchedItems = _ramda2.default.filter(isMatch);
	
	var getTitle = _ramda2.default.prop('title');
	
	var getTitlesFromHistory = _ramda2.default.compose(_ramda2.default.uniq, _ramda2.default.map(getTitle));
	
	var createList = _ramda2.default.compose(getTitlesFromHistory, getMatchedItems);
	
	var limiter = function limiter(item) {
	    //if get multiple url's like url/page-1, url/page-2 need to limit
	};
	
	exports.listFormatter = listFormatter;
	exports.searchChromeHistory = searchChromeHistory;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = R;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var saveOptions = function saveOptions() {
	    chrome.storage.sync.set({
	        deliveryFrequency: 'daily',
	        publishingAccount: '' // will be used for later if add ability to publish to Twitter
	    }, function () {
	        console.log('Options saved');
	    });
	};
	
	var getOptions = function getOptions() {
	    chrome.storage.sync.get('deliveryFrequency', function (data) {
	        console.log('data', data);
	    });
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map