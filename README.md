# twitter-splitter

[![Build Status](https://travis-ci.org/pnevares/twitter-splitter.svg?branch=master)](https://travis-ci.org/pnevares/twitter-splitter) [![npm](https://img.shields.io/npm/v/twitter-splitter.svg)](https://www.npmjs.com/package/twitter-splitter)

Split your text into Twitter-friendly pieces (with optional counters).

Usage:

```js
const twitterSplitter = require("twitter-splitter");
const limit = 25;
const joiner = '...';

let text = twitterSplitter("This is a short tweet with a very short character limit", limit, joiner);

console.log(text);

/*
[ 'This is a short tweet...',
  '...with a very short...',
  '...character limit' ]
*/

text = twitterSplitter("This is a short tweet with a very short character limit", limit, " {count}/{total}");
console.log(text);

/*
[ 'This is a short tweet 1/3',
  'with a very short 2/3',
  'character limit 3/3' ]
*/
```
