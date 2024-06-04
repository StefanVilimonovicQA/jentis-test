import { createRandomUser } from '../../../fixtures/createUser';

describe('Contacts API tests', () => {
  let token;
  const user1 = createRandomUser();
  const user2 = createRandomUser();
  it('Update user', () => {
    cy.addUser(
      user1.firstName,
      user1.lastName,
      user1.email,
      user1.password
    ).then((response) => {
      token = response.body.token;
      cy.request({
        method: 'PATCH',
        url: '/users/me',
        auth: {
          bearer: token,
        },
        body: {
          firstName: user2.firstName,
          lastName: user2.lastName,
          email: user2.email,
          password: user2.password,
        },
      }).then((result) => {
        expect(result.status).to.eq(200);
        expect(result.body.firstName).to.not.eq(response.body.user.firstName);
        expect(result.body.lastName).to.not.eq(response.body.user.lastName);
        expect(result.body.email).to.not.eq(response.body.user.email);
      });
    });
  });
  it('Update user with missing properties', () => {
    const properties = ['firstName', 'lastName', 'email', 'password'];
    const missingProperty =
      properties[Math.floor(Math.random() * properties.length)];

    const mutatedUser = { ...user2 };
    delete mutatedUser[missingProperty];

    cy.request({
      method: 'PATCH',
      url: '/users/me',
      auth: {
        bearer: token,
      },
      body: {
        firstName: mutatedUser.firstName,
        lastName: mutatedUser.lastName,
        email: mutatedUser.email,
        password: mutatedUser.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('Update user with empty properties', () => {
    const body = {
      firstName: user1.firstName,
      lastName: user1.lastName,
      email: user1.email,
      password: user1.password,
    };
    const properties = Object.keys(body);
    properties.forEach((property) => {
      const requestBody = { ...body };
      requestBody[property] = '';
      cy.request({
        method: 'PATCH',
        url: '/users/me',
        failOnStatusCode: false,
        auth: {
          bearer: token,
        },
        body: requestBody,
      }).then((response) => {
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
