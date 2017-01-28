'use strict';

System.register(['./history'], function (_export, _context) {
    "use strict";

    var listFormatter, searchChromeHistory, getAllHistoryItems;
    return {
        setters: [function (_history) {
            listFormatter = _history.listFormatter;
            searchChromeHistory = _history.searchChromeHistory;
            getAllHistoryItems = _history.getAllHistoryItems;
        }],
        execute: function () {

            searchChromeHistory().then(function (list) {
                var formattedList = R.reduce(listFormatter, '', list);

                document.getElementById('list-area').innerHTML = formattedList;

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
        }
    };
});