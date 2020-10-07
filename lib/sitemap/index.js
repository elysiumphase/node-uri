/**
 * sitemap
 *
 * Percent encodings, entities and escape codes.
 *
 * - specialChars
 * - specialCharsKeys
 * - pencodings
 * - pencodingsKeys
 * - entities
 * - entitiesKeys
 * - escapeCodes
 * - escapeCodesKeys
 * - escapeCodesKeysLen
 */

// special chars and their percent encodings
const specialChars = {
  '*': '%2A',
};

// special chars keys
const specialCharsKeys = Object.keys(specialChars);

// inversed special chars (percent encodings)
const pencodings = {};
specialCharsKeys.forEach((char) => {
  pencodings[specialChars[char]] = char;
});

const pencodingsKeys = Object.keys(pencodings);

// sitemap entities to be escaped in URLs
const entities = {
  '&': '&amp;',
  '\'': '&apos;',
};

// entities keys
const entitiesKeys = Object.keys(entities);

// inversed entities keys (escape codes)
const escapeCodes = {};
entitiesKeys.forEach((entity) => {
  escapeCodes[entities[entity]] = entity;
});

// escape codes keys and length
const escapeCodesKeys = Object.keys(escapeCodes);
const escapeCodesKeysLen = escapeCodesKeys.length;

module.exports = Object.freeze({
  specialChars,
  specialCharsKeys,
  pencodings,
  pencodingsKeys,
  entities,
  entitiesKeys,
  escapeCodes,
  escapeCodesKeys,
  escapeCodesKeysLen,
});
