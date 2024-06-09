import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Users API tests', () => {
  let token;
  const user = createRandomUser();
  const contact = createRandomUser();
  const contact2 = createRandomUser();
  let contactID;
  let contactBody;
  before(() => {
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        cy.loginUser(response.body.user.email, user.password).then(
          (response1) => {
            token = response1.body.token;
          }
        );
      }
    );
  });
  it('Update contact', () => {
    cy.addContact(
      token,
      contact.firstName,
      contact.lastName,
      contact.birthdate,
      contact.email,
      contact.phone,
      contact.street1,
      contact.street2,
      contact.city,
      contact.stateProvince,
      contact.postalCode,
      contact.country
    ).then((response) => {
      expect(response.status).to.eq(201);
      contactBody = response.body;
      contactID = response.body._id;

      cy.updateContact(
        token,
        contactID,
        contact.firstName,
        contact.lastName,
        contact.birthdate,
        contact.email,
        contact.phone,
        contact.street1,
        contact.street2,
        contact.city,
        contact.stateProvince,
        contact.postalCode,
        contact.country
      ).then((cont) => {
        expect(cont.status).to.eq(200);
        expect(cont.body).to.not.eq(response.body);
      });
    });
  });
  it('Update contact with missing properties', () => {
    const properties = [
      'firstName',
      'lastName',
      'birthdate',
      'email',
      'phone',
      'street1',
      'street1',
      'city',
      'stateProvince',
      'postalCode',
      'country',
    ];
    const missingProperty =
      properties[Math.floor(Math.random() * properties.length)];

    const mutatedContact = { ...contact2 };
    delete mutatedContact[missingProperty];

    cy.log(`Missing property: ${missingProperty}`);

    cy.updateContact(
      token,
      contactID,
      mutatedContact.firstName,
      mutatedContact.lastName,
      mutatedContact.birthdate,
      mutatedContact.email,
      mutatedContact.phone,
      mutatedContact.street1,
      mutatedContact.street2,
      mutatedContact.city,
      mutatedContact.stateProvince,
      mutatedContact.postalCode,
      mutatedContact.country
    ).then((response) => {
      if (missingProperty === 'firstname' || missingProperty === 'lastName') {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include(
          `Validation failed: ${missingProperty}`
        );
      } else {
        expect(response.status).to.eq(200);
      }
    });
  });
  it('Update contact with empty properties', () => {
    console.log(contactBody);
    const properties = Object.keys(contactBody);
    console.log(properties);
    properties.forEach((property) => {
      const requestBody = { ...contactBody };
      requestBody[property] = '';
      cy.updateContact(
        token,
        contactID,
        requestBody.firstName,
        requestBody.lastName,
        requestBody.birthdate,
        requestBody.email,
        requestBody.phone,
        requestBody.street1,
        requestBody.street2,
        requestBody.city,
        requestBody.stateProvince,
        requestBody.postalCode,
        requestBody.country
      ).then((response) => {
        if (response.status === 400) {
          expect(response.body.message).to.include(
            `Validation failed: ${property}:`
          );
        } else {
          expect(response.status).to.eq(200);
        }
      });
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
