import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
  let token;
  const user = createRandomUser();
  const contact = createRandomUser();
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
  beforeEach(() => {
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
    });
  })
  it('Get contact', () => {
    
    cy.getContactList(token).then((result) => {
      expect(result.status).to.eq(200);
      expect(result.body).to.be.an('array').and.not.be.empty;

        cy.getContactList(token, result.body[0]._id)
    });
  });
  it('Get contact with empty authorization token', () => {
    cy.getContactList('').then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Get contact with invalid authorization token', () => {
    cy.getContactList(faker.string.uuid()).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Get contact with empty contact Id', () => {
    cy.getContactList(token, '').then((result) => {
      expect(result.status).to.eq(200);
      expect(result.body).to.be.an('array').and.not.be.empty;
    });
  });
  it('Get contact with invalid contact Id', () => {
    cy.getContactList(token, faker.string.uuid()).then((result) => {
      expect(result.status).to.eq(400);
      expect(result.body).to.eq('Invalid Contact ID');
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
