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

const listFormatter = (a, b) => {
  return a + '\n' + b
}

const builder = R.curry((separator = '', a, b) => a + separator + b)

const dictBuilder = builder('|')

//const listFormatter = builder('\n')

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

const getTodaysDate = () => {
    const date = new Date()
    date.setHours(0,0,0,0)
    return date.getTime()
}

const historySearch = () => {
  chrome.history.search({
    'text': '', //empty string returns all,
    'startTime': getTodaysDate(),
    'maxResults': 1000000
  },
  historyItems => {
    const createList = R.compose(
      R.reduce(listFormatter, ''),
      R.uniq,
      R.map(getTitle)
    )

    const getListLength = R.compose(
        R.length,
        R.uniq,
        R.map(getTitle)
    )

    const listLength = getListLength(getMatchedItems(historyItems))
    console.log(listLength)

    const list = createList((getMatchedItems(historyItems)))

    console.log(list)
  }
)}

document.addEventListener('DOMContentLoaded', () => {
  historySearch()
});
