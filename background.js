let dict = ['medium.com', 'quora.com', 'nytimes.com', 'cnn.com', 'newsweek.com', 'blog']

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
});
