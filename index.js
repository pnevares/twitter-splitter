const COUNTERS_REGEX = /{(count|total)}/gi;

function replaceCounters(text, counters) {
  return text.replace(COUNTERS_REGEX, function(_, match) {
    return counters[match] || match
  })
}

module.exports = (text, limit = 280, joiner = '...') => {
  if (text.length <= limit) {
    return [text];
  }
  const hasCounters = COUNTERS_REGEX.test(joiner);

  const joinerLength = hasCounters
    ? replaceCounters(joiner, { count: 99, total: 99 }).length
    : joiner.length;

  let newText = text;
  const result = [];

  do {
    const cutoff = newText.lastIndexOf(' ', limit - (joinerLength * ((!hasCounters && result.length) ? 2 : 1)));

    if (cutoff === -1) {
      throw new Error(`The text cannot be split with a limit: ${limit}, joiner: ${joiner}`);
    }

    let chunk = newText.slice(0, cutoff) + joiner;
    if (!hasCounters && result.length) {
      chunk = joiner + chunk;
    }
    result.push(chunk);
    newText = newText.slice(cutoff + 1);
  } while (newText.length > limit - joinerLength);

  if (!hasCounters) {
    result.push(joiner + newText);
    return result;
  } else {
    result.push(newText + joiner);
    return result.map(function(line, index) {
      return replaceCounters(line, {
        total: result.length,
        count: index + 1
      });
    });
  }
};
