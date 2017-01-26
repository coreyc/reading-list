//either use a 3rd party API here to get blog/journal/article related sites, OR
//include all and remove facebook, twitter, instagram, amazon, etc, OR 
//check for more than two words in url
let dict = ['medium.com', 'quora.com', 'nytimes.com', 'cnn.com', 'newsweek.com', 'blog', 'topic']

//////////////Impure functions/////////////////

//user-specified url to add to list
const includeUrl = (item = '') => {
    dict.push(item)
}

//remove url from list
const removeUrl = (item = '') => {
    const index = dict.indexOf(item)
    if (index != -1) {
        dict.splice(index, 1)
    }
}

const getBaseUrl = () => {
    const splitUrl = window.location.href.split('/')
    const baseUrl = splitUrl[2]
    //common for sites to use 'blog' as subdomain, so we include it
    if (splitUrl[3] === 'blog') {
        return baseUrl + '/' + splitUrl[3]
    }
    return baseUrl
}

const getTodaysDate = () => {
    const date = new Date()
    date.setHours(0,0,0,0)
    return date.getTime()
}

const addCurrentPageToDict = () => {
    dict.push(getBaseUrl())
}

const limiter = item => {
    //if get multiple url's like url-page-1, url-page-2 need to limit
}

const searchChromeHistory = () => {
    return new Promise((resolve, reject) => {
        chrome.history.search({
            'text': '', //empty string returns all,
            'startTime': getTodaysDate(),
            'maxResults': 1000000
        }, historyItems => {
            const createList = R.compose(
                R.reduce(listFormatter, ''),
                R.uniq,
                R.map(getTitlePF)
            )
            const list = createList((getMatchedItems(historyItems)))
            resolve(list)
        })
    })
}

//////////////(Mostly) pure functions////////////////

const strBuilder = (a = '', b = '') => {
    return a + '|' + b
}

const listFormatter = (a, b) => {
  return a + '\n' + b
}

const createRegexFromDict = (source = []) => {
    return new RegExp(R.reduce(strBuilder, '', source).slice(1))
}

const isMatch = item => {
    return R.test(createRegexFromDict(dict), item.url)
}

const getMatchedItems = items => {
    return R.filter(isMatch, items)
}

const getTitle = item => {
    return R.prop('title', item)
}

const getTitlePF = R.prop('title')

const getAllHistoryItems = (resolve, reject, historyItems) => {
    console.log(typeof historyItems)
    const createList = R.compose(
        R.reduce(listFormatter, ''),
        R.uniq,
        R.map(getTitle)
    )
    const list = createList((getMatchedItems(historyItems)))

    console.log(list)
    resolve(list)
}

const getListLength = historyItems => { 
    R.compose(
        R.length,
        R.uniq,
        R.map(getTitle)
    )

    const listLength = getListLength(getMatchedItems(historyItems))
    console.log(listLength)
}

export {
    includeUrl,
    removeUrl,
    addCurrentPageToDict,
    searchChromeHistory,
    getAllHistoryItems,
    getListLength    
}
