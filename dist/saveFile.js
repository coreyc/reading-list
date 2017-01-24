'use strict';

System.register(['./history'], function (_export, _context) {
    "use strict";

    var searchChromeHistory, doExportToDisk;


    function exportToFileEntry(fileEntry) {
        var _this = this;

        savedFileEntry = fileEntry;
        var status = document.getElementById('status');

        // Use this to get a file path appropriate for displaying
        chrome.fileSystem.getDisplayPath(fileEntry, function (path) {
            fileDisplayPath = path;
            status.innerText = 'Exporting to ' + path;
        });

        getTodosAsText(function (contents) {
            fileEntry.createWriter(function (fileWriter) {
                var truncated = false;
                var blob = new Blob([contents]);

                fileWriter.onwriteend = function (e) {
                    if (!truncated) {
                        truncated = true;
                        // You need to explicitly set the file size to truncate
                        // any content that might have been there before
                        _this.truncate(blob.size);
                        return;
                    }
                    status.innerText = 'Export to ' + fileDisplayPath + ' completed';
                };

                fileWriter.onerror = function (e) {
                    status.innerText = 'Export failed: ' + e.toString();
                };

                fileWriter.write(blob);
            });
        });
    }
    return {
        setters: [function (_history) {
            searchChromeHistory = _history.searchChromeHistory;
        }],
        execute: function () {

            searchChromeHistory(); // push history urls/titles into array(?)
            // print array into bullet format
            // download file

            doExportToDisk = function doExportToDisk() {
                var savedFileEntry = void 0;

                if (savedFileEntry) {
                    exportToFileEntry(savedFileEntry);
                } else {
                    chrome.fileSystem.chooseEntry({
                        type: 'saveFile',
                        suggestedName: 'list.txt',
                        accepts: [{
                            description: 'Text files (*.txt)',
                            extensions: ['txt']
                        }],
                        acceptsAllTypes: true
                    }, exportToFileEntry);
                }
            };
        }
    };
});