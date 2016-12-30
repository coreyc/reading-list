let dict = ['https://www.medium.com', 'https://www.quora.com']

/*
1. create list of regexes from url dictionary - working
2. match history item against regex
3. print title of page from each matching history item
*/

const strBuilder = (a, b) => {
  return a + '|' + b
}

const createRegexFromList = (source = []) => {
  // use monad here to check for source being empty?
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

//TODO: add function for user to add url root to dict

//TODO: add filter function based on user blacklist

const historySearch = () => {
  chrome.history.search({
    'text': '', //empty string returns all
    'maxResults': 1000000
  }, 
  historyItems => {
    R.map(getTitle, getMatchedItems(historyItems))
    // historyItems
    //   .filter(item => console.log(regexpList(dict).map(regex => regex.exec(item.url))))
  }
)}

document.addEventListener('DOMContentLoaded', () => {
  historySearch()
});