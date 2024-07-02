const cds = require('@sap/cds');
const { map } = require('@fourlights/mapper');
const { AnonymizePlugin, withClassification } = require('@fourlights/mapper-plugin-anonymize');
// const { author: authorConfig } = require('../anonymize-config');

module.exports = cds.service.impl(async (srv) => {
  srv.on ('READ', 'Users', each => {
    return [
      {
        ID: 1,
        name: "John Doe",
        birthdate: "1980-05-15",
        nationality: "American",
        email: "john.doe@example.com",
        address: "123 Elm Street, Springfield, IL",
        phone: "123-456-7890"
      },
      {
        ID: 2,
        name: "Jane Smith",
        birthdate: "1975-09-23",
        nationality: "British",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue, London",
        phone: "098-765-4321"
      },
      {
        ID: 3,
        name: "Emily Davis",
        birthdate: "1990-12-01",
        nationality: "Canadian",
        email: "emily.davis@example.com",
        address: "789 Maple Road, Toronto, ON",
        phone: "234-567-8901"
      },
      {
        ID: 4,
        name: "Michael Brown",
        birthdate: "1985-07-19",
        nationality: "Australian",
        email: "michael.brown@example.com",
        address: "321 Pine Lane, Sydney, NSW",
        phone: "345-678-9012"
      },
      {
        ID: 5,
        name: "Laura Wilson",
        birthdate: "1981-06-01",
        nationality: "American",
        email: "laura.wilson@example.com",
        address: "654 Birch Boulevard, Springfield, IL",
        phone: "456-789-0123"
      }
    ];
  })
})