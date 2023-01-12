import {
  common,
  parseString,
  stringToCountMap,
  translateHTMLEntities,
} from './common';

describe('common', () => {
  it('should work', () => {
    expect(common()).toEqual('common');
  });
});

describe('translateHTMLEntities', () => {
  it('should translate', () => {
    expect(translateHTMLEntities(`Hi.&nbsp;We are Pete &amp; David.`)).toEqual(
      'Hi. We are Pete & David.'
    );
  });
  it('should not translate', () => {
    expect(translateHTMLEntities(`3,1415 &asymp; 3,14`)).toEqual(
      `3,1415 &asymp; 3,14`
    );
  });
});

describe('stringToCountMap', () => {
  const sentenceOne = 'Hello World. Hello Pete.';
  const rawCountMapOne = { Hello: 2, 'World.': 1, 'Pete.': 1 };
  const parsedCountMapOne = { hello: 2, world: 1, pete: 1 };

  it('should be equal', () => {
    expect(stringToCountMap(sentenceOne)).toEqual(rawCountMapOne);
  });
  it('should be equal to parsed countmap', () => {
    expect(stringToCountMap(parseString(sentenceOne))).toEqual(
      parsedCountMapOne
    );
  });
  it('[CUSTOM SEPERATOR] - should be equal', () => {
    expect(stringToCountMap(sentenceOne, '.')).toEqual({
      'Hello World': 1,
      ' Hello Pete': 1,
    });
  });
});

describe('parseString', () => {
  const sentenceOne = '<title>HTML 5 &quot;Boilerplate&quot;</title>';
  it('should lower, strip HMTLTags, strip certain HTMLEntites', () => {
    expect(parseString(sentenceOne)).toEqual('html 5  boilerplate ');
  });
  it('[CUSTOM REGEX] - should leave quotes untouched', () => {
    expect(
      parseString(sentenceOne, /(<([^>]+)>)/gi, /[.,;:!?()[\]{}\\$/*&\-\–\s]/g)
    ).toEqual('html 5 "boilerplate"');
  });
});
