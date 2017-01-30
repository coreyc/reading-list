'use strict';

System.register(['../src/history.js', 'expect.js'], function (_export, _context) {
    "use strict";

    var listFormatter, searchChromeHistory, expect;
    return {
        setters: [function (_srcHistoryJs) {
            listFormatter = _srcHistoryJs.listFormatter;
            searchChromeHistory = _srcHistoryJs.searchChromeHistory;
        }, function (_expectJs) {
            expect = _expectJs.default;
        }],
        execute: function () {

            describe('HISTORY', function () {
                describe('#listFormatter', function () {
                    it('should run', function () {
                        expect(2).to.equal(2);
                    });
                });
            });
        }
    };
});