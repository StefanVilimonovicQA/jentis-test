import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
  let token;
  const user = createRandomUser();
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
      user.firstName,
      user.lastName,
      user.birthdate,
      user.email,
      user.phone,
      user.street1,
      user.street2,
      user.city,
      user.stateProvince,
      user.postalCode,
      user.country
    ).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it('Get contact list', () => {
    cy.getContactList(token).then((result) => {
      expect(result.status).to.eq(200);
      expect(result.body).to.be.an('array').and.not.be.empty;
    });
  });
  it('Get contact list with empty authorization token', () => {
    cy.getContactList('').then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Get contact list with invalid authorization token', () => {
    cy.getContactList(faker.string.uuid()).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
