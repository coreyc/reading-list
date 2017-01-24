import * as history from './history'

document.addEventListener('DOMContentLoaded', () => {
    const list = history.searchChromeHistory() //should this return a promise?
    console.log('list', list)
    document.getElementById('addCurrentPage').addEventListener('click', history.addCurrentPageToDict)
    document.getElementById('showUrls').addEventListener('click', history.showUrls)
    document.getElementById('number-read').addEventListener('load', history.getListLength)
    document.body.innerHTML += "<a id='test' href='data:text;charset=utf-8," + 
        encodeURIComponent(list) + "' download='reading-list'>Your List</a>"
})