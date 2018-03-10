# twitter-splitter

[![Build Status](https://travis-ci.org/pnevares/twitter-splitter.svg?branch=master)](https://travis-ci.org/pnevares/twitter-splitter) [![npm](https://img.shields.io/npm/v/twitter-splitter.svg)](https://www.npmjs.com/package/twitter-splitter)


Split your text into Twitter-friendly pieces

Usage:
```js
const twitterSplitter = require("twitter-splitter");
const limit = 25;
const joiner = '...';

const text = twitterSplitter("This is a short tweet with a very short character limit", limit, joiner);

console.log(text);

/*
[ 'This is a short tweet...',
  '...with a very short...',
  '...character limit' ]
*/
```
