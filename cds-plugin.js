const cds = require('@sap/cds');
const { anonymizeEntity, anonymizeElements } = require('./lib/anonymize');
const { anonymizeEntityWithSeeding } = require('./lib/anonymize-with-seeding');
const { ANNOTATION, log } = require('./lib/constants');


cds.on('serving', async (srv) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    log.warn('Anonymization is disabled in production environment');
    return;
  }

  if (!srv instanceof cds.ApplicationService) {
    throw new Error('Invalid cds service object');
  }
  
  const entities = srv.entities;
  for (const [entityName, entity] of Object.entries(entities)) {
    // Check for entity-level annotations
    if (entity[ANNOTATION]) {
      srv.after('READ', entityName, (plainResponseItems) => {
        log.info(`Anonymizing data for entity: ${entityName}`);
        anonymizeEntityWithSeeding(plainResponseItems, entity);
      });
    } else {
      // Check for element-level annotations
      const elementsWithAnnotation = Object.values(entity.elements).some(element => element[ANNOTATION]);
      if (elementsWithAnnotation) {
        srv.after('READ', entityName, (plainResponseItems) => {
          log.info(`Anonymizing elements for entity: ${entityName}`);
          anonymizeElements(plainResponseItems, entity);
        });
      }
    }
  }
});