const { map } = require('@fourlights/mapper');
const { AnonymizePlugin, withClassification } = require('@fourlights/mapper-plugin-anonymize');
const { ANNOTATION } = require('./constants');

function anonymizeEntity(plainResponseItems, entity) {
  const { elements } = entity;
  const config = {};

  for (const [elementName, element] of Object.entries(elements)) {
    if (element.key) { // Do not anonymize key elements
      config[elementName] = [(d) => d[elementName]];
    } else {
      config[elementName] = [(d) => d[elementName], 'pii'];
    }
  }

  for (let i = 0; i < plainResponseItems.length; i++) {
    plainResponseItems[i] = map(
      plainResponseItems[i],
      withClassification(config),
      { plugins: [new AnonymizePlugin()] }
    );
  }
}

function anonymizeElements(plainResponseItems, entity) {
  const { elements } = entity;
  const config = {};

  for (const [elementName, element] of Object.entries(elements)) {
    if (element[ANNOTATION] === true) {
      config[elementName] = [(d) => d[elementName], 'pii'];
    } else if (typeof element[ANNOTATION] === 'string') {
      if (element[ANNOTATION] !== 'sensitive') {
        throw new Error(`Invalid value for annotation: ${element[ANNOTATION]}`);
      }
      config[elementName] = [(d) => d[elementName], element[ANNOTATION]];

    } else {
      config[elementName] = [(d) => d[elementName]];
    }
  }

  for (let i = 0; i < plainResponseItems.length; i++) {
    plainResponseItems[i] = map(
      plainResponseItems[i],
      withClassification(config),
      { plugins: [new AnonymizePlugin()] }
    );
  }
}

module.exports = {
  anonymizeEntity,
  anonymizeElements
}