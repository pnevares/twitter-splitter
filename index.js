module.exports = (text, limit = 280, joiner = "...") => {
  if(text.length <= limit) {
    return text;
  }

  const result = [];

  do {
    const cutoff = text.lastIndexOf(" ", limit - (joiner.length * (result.length? 2 : 1)));
    let chunk = text.slice(0, cutoff) + joiner;
    if (result.length) {
      chunk = joiner + chunk;
    }
    result.push(chunk);
    text = text.slice(cutoff + 1);
  } while (text.length > limit - joiner.length);

  result.push(joiner + text);

  return result;
}