const DataAnonymizer = require('data-anonymizer');
const { log, ANNOTATION } = require('./constants');

const secret = process.env.ANONYMIZATION_SECRET;
const a = new DataAnonymizer({ seed: secret || 'someSecret' });

function anonymizeEntityWithSeeding(plainResponseItems, entity) {
  const { elements} = entity;
  log.info(`Anonymizing data for entity: ${entity.name}`);
  for (const item of plainResponseItems) {
    for (const [elementName, element] of Object.entries(elements)) {
      if (element.key) {
        item[elementName] = item[elementName];
      } else {
        item[elementName] = a.anonymize(item[elementName]);
      }
    }
  }
}

function anonymizeElementsWithSeeding(plainResponseItems, entity) {
  const { elements } = entity;
  for (const item of plainResponseItems) {
    for (const [elementName, element] of Object.entries(elements)) {
      if (element[ANNOTATION]) {
        log.info(`Anonymizing element: ${elementName} for entity: ${entity.name}`);
        item[elementName] = a.anonymize(item[elementName]);
      }
    }
  }
}

module.exports = {
  anonymizeEntityWithSeeding,
  anonymizeElementsWithSeeding
}