const cds = require('@sap/cds');

const ANNOTATE_ANONYMIZE = '@dbg.anonymize';
const log = cds.log('remote-srv');

cds.on('served', (srv)=> {
  if (!srv instanceof cds.ApplicationService) return;

  for (const [entityName, entity] of Object.entries(srv.entities)) {
    log(`Entity: ${entityName}`);

    for (const [elementName, element] of Object.entries(entity.elements)) {
      if (element[ANNOTATE_ANONYMIZE]) {
        log(`  - Element: ${elementName}`);
      }
    }
  }
});