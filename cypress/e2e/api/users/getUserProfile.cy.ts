import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Users API tests', () => {
  let token;
  let result;
  let result1;
  before(() => {
    const user = createRandomUser();
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        result1 = response;
        cy.loginUser(response.body.user.email, user.password).then(
          (response1) => {
            token = response1.body.token;
            result = response1;
          }
        );
      }
    );
  });
  it('Get user profile', () => {
    cy.getUser(token).then((result) => {
      expect(result.status).to.eq(200);
      expect(result.body.firstName).to.eq(result1.body.user.firstName);
      expect(result.body.lastName).to.eq(result1.body.user.lastName);
      expect(result.body.email).to.eq(result1.body.user.email);
    });
  });
  it('Get user profile with empty authorization token', () => {
    cy.getUser('').then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  it('Get user profile with invalid authorization token', () => {
    cy.getUser(faker.string.uuid()).then((result) => {
      expect(result.status).to.eq(401);
      expect(result.body.error).to.eq('Please authenticate.');
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
