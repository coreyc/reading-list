//either use a 3rd party API here to get blog/journal/article related sites, OR
//include all and remove facebook, twitter, instagram, amazon, etc, OR 
//check for more than two words in url
let dict = ['medium.com', 'quora.com', 'nytimes.com', 'cnn.com', 'newsweek.com', 'blog', 'topic']

//user-specified url to add to list
const includeUrl = item => {
  dict.push(item)
}

//exclude url from list
const excludeUrl = (item = '') => {
  const index = dict.indexOf(item);
  if (index != -1) {
    dict.splice(index, 1)
  }
}

const limiter = item => {
  //if get multiple url's like url-page-1, url-page-2 need to limit
  //need to limit duplicates (if visit same article more than once in a time period (if setting is daily, then daily, if weekly, then weekly))
  chrome.storage.sync.get({}, () => {
    options.deliveryFrequency
  })
}

const strBuilder = (a, b) => {
  return a + '|' + b
}

const createRegexFromList = (source = []) => {
  //use monad here to check for source being empty?
  return new RegExp(R.reduce(strBuilder, '', source).slice(1))
}

const isMatch = item => {
  return R.test(createRegexFromList(dict), item.url)
}

const getMatchedItems = items => {
  return R.filter(isMatch, items)
}

const getTitle = item => {
  console.log(R.prop('title', item))
}

const historySearch = () => {
  chrome.history.search({
    'text': '', //empty string returns all
    'maxResults': 1000000
  },
  historyItems => {
    R.map(getTitle, getMatchedItems(historyItems))
  }
)}

document.addEventListener('DOMContentLoaded', () => {
  historySearch()
  
  document.getElementById('addCurrentPage').addEventListener('click', () => {
    console.log('ok')
  })
})