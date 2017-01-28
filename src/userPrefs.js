const saveOptions = () => {
    chrome.storage.sync.set({
        deliveryFrequency: 'daily', 
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
