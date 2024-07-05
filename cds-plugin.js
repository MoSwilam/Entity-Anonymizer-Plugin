const cds = require('@sap/cds');
const { anonymizeEntity, anonymizeElements } = require('./lib/anonymize');
const { anonymizeEntityWithSeeding, anonymizeElementsWithSeeding } = require('./lib/anonymize-with-seeding');
const { ANNOTATION, log } = require('./lib/constants');
require('dotenv').config();

cds.on('serving', async (srv) => {
  if (process.env.NODE_ENV === 'production') {
    log.info('Anonymization is disabled in production environment');
    return;
  }

  if (!srv instanceof cds.ApplicationService) return;
  
  const entities = srv.entities;
  for (const [entityName, entity] of Object.entries(entities)) {
    // Check for entity-level annotations
    if (entity[ANNOTATION]) {
      srv.after('READ', entityName, (plainResponseItems) => {
        anonymizeEntity(plainResponseItems, entity);
      });
    } else {
      // Check for element-level annotations
      const elementsWithAnnotation = Object.values(entity.elements).some(element => element[ANNOTATION]);
      if (elementsWithAnnotation) {
        srv.after('READ', entityName, (plainResponseItems) => {
          anonymizeElements(plainResponseItems, entity);
        });
      }
    }
  }
});