/**
 * sitemap
 *
 * Entities and escape codes.
 *
 * - entities
 * - entitiesKeys
 * - escapeCodes
 * - escapeCodesKeys
 * - escapeCodesKeysLen
 */

// sitemap entities
const entities = {
  '&': '&amp;',
  '\'': '&apos;',
  '"': '&quot;',
  '>': '&gt;',
  '<': '&lt;',
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
  entities,
  entitiesKeys,
  escapeCodes,
  escapeCodesKeys,
  escapeCodesKeysLen,
});
