export function common(): string {
  return 'common'
}

/**
 * Credit to https://stackoverflow.com/questions/44195322/a-plain-javascript-way-to-decode-html-entities-works-on-both-browsers-and-node
 * Returns mutated string, stripping any HTMLEntities ie. '&12313;'.
 * @param {string} encodedString - any string
 * @returns {string} - returns *encodedString* stripped of HTMLEntities
 */
export function stripHTMLEntities(encodedString: string) {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g
  const translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  }

  return encodedString
    .replace(translate_re, (_, entity) => translate[entity])
    .replace(/&#(\d+);/gi, () => '')
}

/**
 * Takes a string; count's all words seperated by {seperator}.
 * @param {string} string - generic string ie. 'Hello World.'
 * @param {seperator} string - " " by default, used to determine how to split the string
 * @returns {Record<string,number>} - Hashmap (word, repeatedAmount).
 */
export function stringToCountMap(string: string, seperator: string = ' ') {
  return string
    .split(seperator)
    .filter((e) => e !== '')
    .reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1
      return acc
    }, {})
}

/**
 * Removes HTMLTags ie. <p></p>, HTMLEntities ie. &1232;, special characters ie. .,;:!?()
 * @param {string} string - any string
 * @param {RegExp} reg - regex to remove html tags from {string}, defaulting to '/(<([^>]+)>)/gi'
 * @param {RegExp} extraRegex - regex to remove special characters
 * @returns {string} - {string} in lowercase, without HTMLTags, HTMLEntities & special Chars ie. .,:;!?
 */
export function parseString(
  string: string,
  reg: RegExp = /(<([^>]+)>)/gi,
  extraRegex: RegExp = /[.,;:!?()[\]{}"“\\$”/*&\-\–\s]/g
) {
  //@TODO find {RegExp} for {extraRegex} to disallow matching urls.
  const strippedTags = string.replace(reg, '')
  const strippedHTMLEntities = stripHTMLEntities(strippedTags)
  const strippedCharacters = strippedHTMLEntities.replace(extraRegex, () => {
    return ' '
  })
  const strippedLowered = strippedCharacters.toLowerCase()

  return strippedLowered
}
