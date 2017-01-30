import { listFormatter, searchChromeHistory } from '../src/history.js'
import expect from 'expect.js'

describe('HISTORY', () => {
    describe('#listFormatter', () => {
        it('should format input', () => {
            expect(listFormatter('first', 'second')).to.equal('first\nsecond' )
        })
    })

    describe("#searchChromeHistory", () => {
        it('should resolve with array', () => {
            searchChromeHistory().then(list => {
                expect(list).to.be.an('array')
            })
        })

        it('should resolve with array of history results based on our url dictionary', () => {
            searchChromeHistory().then(list => {
                //TODO: add stubs for chrome.history.search
            })
        })
    })
})