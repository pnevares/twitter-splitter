# twitter-splitter
Split text into Tweetable chunks

Usage:
```js
const twitterSplitter = require("twitter-splitter");

const text = twitterSplitter("This is a short tweet with a very short character limit", 25, "...");

console.log(text);

/*
[ 'This is a short tweet...',
  '...with a very short...',
  '...character limit' ]
*/
```
