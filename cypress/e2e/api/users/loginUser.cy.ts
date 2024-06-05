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
  it('Log in user', () => {
    cy.loginUser(user.email, user.password).then((result) => {
      expect(result.status).to.eq(200);
      expect(result.body.user.firstName).to.eq(user.firstName);
      expect(result.body.user.lastName).to.eq(user.lastName);
      expect(result.body.user.email).to.eq(user.email.toLowerCase());
    });
  });
  it('Log in user with missing parameters', () => {
    const properties = ['email', 'password'];
    const missingProperty =
      properties[Math.floor(Math.random() * properties.length)];

    const mutatedUser = { ...user };
    delete mutatedUser[missingProperty];
    cy.loginUser(mutatedUser.email, mutatedUser.password).then((result) => {
      expect(result.status).to.eq(401);
    });
  });
  it('Log in user with invalid parameters', () => {
    let invEmail = faker.internet.exampleEmail();
    let invPassword = faker.internet.password();
    let invParams = [
      { email: invEmail, password: user.password },
      { email: user.email, password: invPassword },
    ];

    invParams.forEach((param) => {
      cy.loginUser(param.email, param.password).then((result) => {
        expect(result.status).to.eq(401);
      });
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
