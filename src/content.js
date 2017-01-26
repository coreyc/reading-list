import * as history from './history'

let list
history.searchChromeHistory().then(val => {
    list = val
    console.log('list', list)
    document.body.innerHTML += "<a id='test' href='data:text;charset=utf-8," + 
        encodeURIComponent(list) + "' download='reading-list'>Your List</a>"
})


//console.log('#', history.getListLength())
//document.getElementById('number-read').innerHTML = history.getListLength()

// leaving this here as it tripped me up for a while. DOMContentLoaded did not appear to be firing
// but apparently content scripts run on their own after the DOM is loaded (at least with 
// "start_at" set in manifest.json)
//https://groups.google.com/a/chromium.org/d/msg/chromium-extensions/9bsbgra9QgE/LvbtWPF_QqUJ
// document.addEventListener('DOMContentLoaded', () => {
//     const list = history.searchChromeHistory()
//     console.log('list', list)
// })