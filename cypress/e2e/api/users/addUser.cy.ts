import { createRandomUser } from '../../../fixtures/createUser';
describe('Users API tests', () => {
  let token;
  let user = createRandomUser();
  let existingEmail;
  it('Add user', () => {
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        token = response.body.token;
        existingEmail = response.body.user.email;
        expect(response.status).to.eq(201);
        expect(response.body.user).to.have.all.keys(
          '_id',
          'firstName',
          'lastName',
          'email',
          '__v'
        );
      }
    );
  });
  it('Add user with missing property', () => {
    const properties = ['firstName', 'lastName', 'email', 'password'];
    const missingProperty =
      properties[Math.floor(Math.random() * properties.length)];

    const mutatedUser = { ...user };
    delete mutatedUser[missingProperty];

    cy.addUser(
      mutatedUser.firstName,
      mutatedUser.lastName,
      mutatedUser.email,
      mutatedUser.password
    ).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include(
        `User validation failed: ${missingProperty}`
      );
    });
  });
  it('Add user with invalid email format', () => {
    const emailFormat = ['testemail', 'testemail@blabla'];
    emailFormat.forEach((email) => {
      cy.addUser(user.firstName, user.lastName, email, user.password).then(
        (response) => {
          console.log(response);
          expect(response.status).to.eq(400);
          expect(response.body.message).to.include(
            `User validation failed: email: Email is invalid`
          );
        }
      );
    });
  });
  it('Add user with existing email', () => {
    cy.addUser(
      user.firstName,
      user.lastName,
      existingEmail,
      user.password
    ).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Email address is already in use');
    });
  });
  after(() => {
    cy.deleteUser(token);
  });
});
