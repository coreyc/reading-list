const history = require('../dist/history.js')
const expect = require('expect.js')

describe('HISTORY', () => {
    describe('#includeUrl', () => {
        it('should add "www.abc.com" to dict', () => {
            let dict = ['cnn.com', 'medium.com']
            history.includeUrl('www.abc.com')
            expect(dict).to.include('www.abc.com')
        })
    })
})