let dict = ['https://www.medium.com', 'https://www.quora.com']

const regexpList = (source = []) => {
  return source.map(urlString => new RegExp(urlString)) // use monad here to check for source being empty?
}


//TODO: add function for user to add url root to dict

//TODO: add filter function based on user blacklist

const historySearch = () => {
  chrome.history.search({
    'text': '', //empty string returns all
    'maxResults': 1000000 
  }, 
  (historyItems) => { // make this section more explicitly use compose (or pipe)
    historyItems
      //.filter(item => item.url === 'https://en.wikipedia.org/wiki/Tatiana_Maslany#Personal_life')
      .filter(item => console.log(regexpList(dict).map(regex => regex.exec(item.url))))
      //.map(item => console.log(item.title, item.url, item))
  }
)};

document.addEventListener('DOMContentLoaded', () => {
  historySearch();
});