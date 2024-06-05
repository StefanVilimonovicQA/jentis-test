import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Users API tests', () => {
  let token;
  const user = createRandomUser();
  before(() => {
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        token = response.body.token;
      }
    );
  });

  it('Log out user', () => {
    cy.logoutUser(token).then((result) => {
      expect(result.status).to.eq(200);
    });
  });
  it('Log out user with empty authorization token', () => {
    cy.logoutUser('').then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Log out user with invalid authorization token', () => {
    cy.logoutUser(faker.string.uuid()).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Log out user which is already logged out', () => {
    cy.logoutUser(token).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
});
