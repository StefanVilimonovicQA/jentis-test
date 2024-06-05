import { createRandomUser } from '../../../fixtures/createUser';

describe('Users API tests', () => {
  let token;
  const user = createRandomUser();
  const user2 = createRandomUser();
  before(() => {
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        cy.loginUser(response.body.user.email, user.password).then(
          (response1) => {
            token = response.body.token;
          }
        );
      }
    );
  });
  it('Update user', () => {
    cy.updateUser(
      token,
      user2.firstName,
      user2.lastName,
      user2.email,
      user2.password
    ).then((result) => {
      expect(result.status).to.eq(200);
      expect(result.body.firstName).to.not.eq(user.firstName);
      expect(result.body.lastName).to.not.eq(user.lastName);
      expect(result.body.email).to.not.eq(user.email);
    });
  });
  it('Update user with missing properties', () => {
    const properties = ['firstName', 'lastName', 'email', 'password'];
    const missingProperty =
      properties[Math.floor(Math.random() * properties.length)];

    const mutatedUser = { ...user };
    delete mutatedUser[missingProperty];

    cy.log(`Missing property: ${missingProperty}`);

    cy.updateUser(
      token,
      mutatedUser.firstName,
      mutatedUser.lastName,
      mutatedUser.email,
      mutatedUser.password
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('Update user with empty properties', () => {
    const body = {
      firstName: user2.firstName,
      lastName: user2.lastName,
      email: user2.email,
      password: user2.password,
    };
    const properties = Object.keys(body);
    properties.forEach((property) => {
      const requestBody = { ...body };
      requestBody[property] = '';
      cy.updateUser(
        token,
        requestBody.firstName,
        requestBody.lastName,
        requestBody.email,
        requestBody.password
      ).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include(
          `User validation failed: ${property}:`
        );
      });
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
