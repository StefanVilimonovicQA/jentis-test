import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Users API tests', () => {
  let token;
  it('Delete user', () => {
    const user = createRandomUser();
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        token = response.body.token;
        cy.deleteUser(token).then((result) => {
          expect(result.status).to.eq(200);
        });
      }
    );
  });
  it('Delete user with empty authorization token', () => {
    cy.deleteUser('').then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Delete user with invalid authorization token', () => {
    cy.deleteUser(faker.string.uuid()).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Delete already deleted user', () => {
    cy.deleteUser(token).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
});
