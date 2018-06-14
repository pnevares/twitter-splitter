module.exports = (text, limit = 280, joiner = '...') => {
  if (text.length <= limit) {
    return [text];
  }

  let newText = text;
  const result = [];

  do {
    const cutoff = newText.lastIndexOf(' ', limit - (joiner.length * (result.length ? 2 : 1)));

    if (cutoff === -1) {
      throw new Error(`The text cannot be split with a limit: ${limit}, joiner: ${joiner}`);
    }

    let chunk = newText.slice(0, cutoff) + joiner;
    if (result.length) {
      chunk = joiner + chunk;
    }
    result.push(chunk);
    newText = newText.slice(cutoff + 1);
  } while (newText.length > limit - joiner.length);

  result.push(joiner + newText);

  return result;
};
