'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var saveOptions, getOptions;
    return {
        setters: [],
        execute: function () {
            saveOptions = function saveOptions() {
                chrome.storage.sync.set({
                    deliveryFrequency: 'daily', //use duck typing for types (i.e. - daily, weekly, monthly?)
                    publishingAccount: '' // will be used for later if add ability to publish to Twitter
                }, function () {
                    console.log('Options saved');
                });
            };

            getOptions = function getOptions() {
                chrome.storage.sync.get('deliveryFrequency', function (data) {
                    console.log('data', data);
                });
            };

            document.addEventListener('DOMContentLoaded', function () {
                document.getElementById('saveOptions').addEventListener('click', saveOptions);
                document.getElementById('getOptions').addEventListener('click', getOptions);
            });
        }
    };
});