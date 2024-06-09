import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
  let token;
  let contactID;
  const user = createRandomUser();
  const user2 = createRandomUser();

  before(() => {
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        token = response.body.token;
        cy.loginUser(user.email, user.password).then((result) => {
          expect(result.status).to.eq(200);
        });
      }
    );
  });
  beforeEach(() => {
    cy.addContact(
      token,
      user2.firstName,
      user2.lastName,
      user2.birthdate,
      user2.email,
      user2.phone,
      user2.street1,
      user2.street2,
      user2.city,
      user2.stateProvince,
      user2.postalCode,
      user2.country
    ).then((con) => {
      contactID = con.body._id;
    });
  });
  it('Delete contact', () => {
    cy.deleteContact(token, contactID).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.eq('Contact deleted');
    });
  });
  it('Delete contact with empty authorization token', () => {
    cy.deleteContact('', contactID).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.error).to.eq('Please authenticate.');
    });
  });
  it('Delete contact with invalid authorization token', () => {
    cy.deleteContact(faker.string.uuid(), contactID).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Delete already deleted contact', () => {
    cy.deleteContact(token,contactID)
    cy.deleteContact(token,contactID).then((result) => {
      expect(result.status).to.eq(404);
      expect(result.body).to.eq('');
    });
  });
});
