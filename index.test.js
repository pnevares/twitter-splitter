const twitterSplitter = require('./index');

describe('twitter-splitter', () => {
  it('should leave a short string alone with default settings', () => {
    const text = 'This is a short string.';
    expect(twitterSplitter(text)).toEqual([text]);
  });

  it('should leave a string at limit alone with a custom limit', () => {
    const text = 'This string is forty-one characters long.';
    expect(twitterSplitter(text, 41)).toEqual([text]);
  });

  it('should split a string with the default joiner', () => {
    const text = 'Hello world';
    expect(twitterSplitter(text, 8)).toEqual([
      'Hello...',
      '...world',
    ]);
  });

  it('should split a short string with custom settings', () => {
    const text = 'Hello world';
    expect(twitterSplitter(text, 5, '')).toEqual([
      'Hello',
      'world',
    ]);
  });

  it('should split a long string into shorter strings with a custom limit', () => {
    const text = 'abc def ghi jkl mno pqr stu vwx yz';
    expect(twitterSplitter(text, 10)).toEqual([
      'abc def...',
      '...ghi...',
      '...jkl...',
      '...mno...',
      '...pqr...',
      '...stu...',
      '...vwx yz',
    ]);
  });

  it('should split up a very, very long string with default settings', () => {
    const text = 'I never said “give teachers guns” like was stated on Fake News @CNN & @NBC. What I said was to look at the possibility of giving “concealed guns to gun adept teachers with military or special training experience - only the best. 20% of teachers, a lot, would now be able to immediately fire back if a savage sicko came to a school with bad intentions. Highly trained teachers would also serve as a deterrent to the cowards that do this. Far more assets at much less cost than guards. A “gun free” school is a magnet for bad people. ATTACKS WOULD END! History shows that a school shooting lasts, on average, 3 minutes. It takes police & first responders approximately 5 to 8 minutes to get to site of crime. Highly trained, gun adept, teachers/coaches would solve the problem instantly, before police arrive. GREAT DETERRENT! If a potential “sicko shooter” knows that a school has a large number of very weapons talented teachers (and others) who will be instantly shooting, the sicko will NEVER attack that school. Cowards won’t go there...problem solved. Must be offensive, defense alone won’t work!';
    expect(twitterSplitter(text)).toEqual([
      'I never said “give teachers guns” like was stated on Fake News @CNN & @NBC. What I said was to look at the possibility of giving “concealed guns to gun adept teachers with military or special training experience - only the best. 20% of teachers, a lot, would now be able to...',
      '...immediately fire back if a savage sicko came to a school with bad intentions. Highly trained teachers would also serve as a deterrent to the cowards that do this. Far more assets at much less cost than guards. A “gun free” school is a magnet for bad people. ATTACKS WOULD...',
      '...END! History shows that a school shooting lasts, on average, 3 minutes. It takes police & first responders approximately 5 to 8 minutes to get to site of crime. Highly trained, gun adept, teachers/coaches would solve the problem instantly, before police arrive. GREAT...',
      '...DETERRENT! If a potential “sicko shooter” knows that a school has a large number of very weapons talented teachers (and others) who will be instantly shooting, the sicko will NEVER attack that school. Cowards won’t go there...problem solved. Must be offensive, defense alone...',
      '...won’t work!',
    ]);
  });

  it('should split up a very, very long string with custom settings', () => {
    const text = 'I never said “give teachers guns” like was stated on Fake News @CNN & @NBC. What I said was to look at the possibility of giving “concealed guns to gun adept teachers with military or special training experience - only the best. 20% of teachers, a lot, would now be able to immediately fire back if a savage sicko came to a school with bad intentions. Highly trained teachers would also serve as a deterrent to the cowards that do this. Far more assets at much less cost than guards. A “gun free” school is a magnet for bad people. ATTACKS WOULD END! History shows that a school shooting lasts, on average, 3 minutes. It takes police & first responders approximately 5 to 8 minutes to get to site of crime. Highly trained, gun adept, teachers/coaches would solve the problem instantly, before police arrive. GREAT DETERRENT! If a potential “sicko shooter” knows that a school has a large number of very weapons talented teachers (and others) who will be instantly shooting, the sicko will NEVER attack that school. Cowards won’t go there...problem solved. Must be offensive, defense alone won’t work!';
    expect(twitterSplitter(text, 140, '[...]')).toEqual([
      'I never said “give teachers guns” like was stated on Fake News @CNN & @NBC. What I said was to look at the possibility of giving[...]',
      '[...]“concealed guns to gun adept teachers with military or special training experience - only the best. 20% of teachers, a lot, would[...]',
      '[...]now be able to immediately fire back if a savage sicko came to a school with bad intentions. Highly trained teachers would also[...]',
      '[...]serve as a deterrent to the cowards that do this. Far more assets at much less cost than guards. A “gun free” school is a magnet[...]',
      '[...]for bad people. ATTACKS WOULD END! History shows that a school shooting lasts, on average, 3 minutes. It takes police & first[...]',
      '[...]responders approximately 5 to 8 minutes to get to site of crime. Highly trained, gun adept, teachers/coaches would solve the[...]',
      '[...]problem instantly, before police arrive. GREAT DETERRENT! If a potential “sicko shooter” knows that a school has a large number of[...]',
      '[...]very weapons talented teachers (and others) who will be instantly shooting, the sicko will NEVER attack that school. Cowards won’t[...]',
      '[...]go there...problem solved. Must be offensive, defense alone won’t work!',
    ]);
  });

  it('should use the same character counting method as Twitter', () => {
    // If café were counted as more than 4 chars, the limit of 7 would force a split at the space
    const text = 'café 😘';
    expect(twitterSplitter(text, 7, '')).toEqual([text]);
  });

  it('should throw with an impossible limit/joiner combination', () => {
    const text = 'a b c d';
    expect(() => twitterSplitter(text, 3, '...')).toThrow(/The text cannot be split/);
  });

  it('should throw with an impossible limit', () => {
    const text = 'supercalifragilisticexpialidocious';
    expect(() => twitterSplitter(text, 5)).toThrow(/The text cannot be split/);
  });

  it('should replace {count}/{total} in splits', () => {
    const text = 'abc def ghi jkl mno pqr stu vwx yz';
    expect(twitterSplitter(text, 15, " {count}/{total}")).toEqual([
      'abc def 1/5',
      'ghi jkl 2/5',
      'mno pqr 3/5',
      'stu vwx 4/5',
      'yz 5/5',
    ]);
  });

  it('should split up a very, very long string with counters', () => {
    const text = 'I never said “give teachers guns” like was stated on Fake News @CNN & @NBC. What I said was to look at the possibility of giving “concealed guns to gun adept teachers with military or special training experience - only the best. 20% of teachers, a lot, would now be able to immediately fire back if a savage sicko came to a school with bad intentions. Highly trained teachers would also serve as a deterrent to the cowards that do this. Far more assets at much less cost than guards. A “gun free” school is a magnet for bad people. ATTACKS WOULD END! History shows that a school shooting lasts, on average, 3 minutes. It takes police & first responders approximately 5 to 8 minutes to get to site of crime. Highly trained, gun adept, teachers/coaches would solve the problem instantly, before police arrive. GREAT DETERRENT! If a potential “sicko shooter” knows that a school has a large number of very weapons talented teachers (and others) who will be instantly shooting, the sicko will NEVER attack that school. Cowards won’t go there...problem solved. Must be offensive, defense alone won’t work!';
    expect(twitterSplitter(text, 280, " {count}/{total}")).toEqual([
      'I never said “give teachers guns” like was stated on Fake News @CNN & @NBC. What I said was to look at the possibility of giving “concealed guns to gun adept teachers with military or special training experience - only the best. 20% of teachers, a lot, would now be able to 1/5',
      'immediately fire back if a savage sicko came to a school with bad intentions. Highly trained teachers would also serve as a deterrent to the cowards that do this. Far more assets at much less cost than guards. A “gun free” school is a magnet for bad people. ATTACKS WOULD 2/5',
      'END! History shows that a school shooting lasts, on average, 3 minutes. It takes police & first responders approximately 5 to 8 minutes to get to site of crime. Highly trained, gun adept, teachers/coaches would solve the problem instantly, before police arrive. GREAT 3/5',
      'DETERRENT! If a potential “sicko shooter” knows that a school has a large number of very weapons talented teachers (and others) who will be instantly shooting, the sicko will NEVER attack that school. Cowards won’t go there...problem solved. Must be offensive, defense alone 4/5',
      'won’t work! 5/5',
    ]);
  });
});
