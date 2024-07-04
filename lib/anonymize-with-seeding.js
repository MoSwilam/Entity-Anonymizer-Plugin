const DataAnonymizer = require('data-anonymizer');
const a = new DataAnonymizer({ seed: 'someSecret' });

function anonymizeEntityWithSeeding(plainResponseItems, entity) {
  const { elements } = entity;
  const res = [];
  const anonymized = {}
  for (const [elementName, element] of Object.entries(elements)) {
    if (element.key) {
      anonymized[elementName] = plainResponseItems[elementName];
    } else {
      anonymized[elementName] = a.anonymize(plainResponseItems[elementName]);
    }
    res.push(anonymized);
  }
  const x = 8;
}

module.exports = {
  anonymizeEntityWithSeeding
}