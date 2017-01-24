const saveOptions = () => {
    chrome.storage.sync.set({
        deliveryFrequency: 'daily', //use duck typing for types (i.e. - daily, weekly, monthly?)
        publishingAccount: '' // will be used for later if add ability to publish to Twitter
    }, () => {
        console.log('Options saved')
    })
}

const getOptions = () => {
    chrome.storage.sync.get('deliveryFrequency', data => {
        console.log('data', data)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveOptions').addEventListener('click', saveOptions)
    document.getElementById('getOptions').addEventListener('click', getOptions)
})