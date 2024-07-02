const cds = require('@sap/cds');

const ANNOTATION = '@dbg.anonymize';
const log = cds.log('entity-anonymizer-plugin');

cds.on('serving', async (srv) => {
  // Iterate over all services

  srv.after('READ', '*', (each, req) => {
      const entity = req.target;
      const elements = entity.elements;

      log.info(`Anonymizing entity ${entity.name}`);

      // Anonymize all elements of the entity if the entity itself is annotated
      if (entity[ANNOTATION]) {
        return anonymizeAllEntityElements(each, elements);
      }

      // Anonymize only the elements that are annotated
      for (const [key, element] of Object.entries(elements)) {
        if (element[ANNOTATION]) {
          anonymizeElement(each, key);
        }
      }

  });
});

function anonymizeAllEntityElements(record, elements) {
  for (const [key, element] of Object.entries(elements)) {
    anonymizeElement(record, key);
  }
}


function anonymizeElement(record, key) {
  record[key] = '**********';
}