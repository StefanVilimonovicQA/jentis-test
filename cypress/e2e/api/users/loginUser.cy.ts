import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
  let token;
  const user = createRandomUser();
  it('Log in user', () => {
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        token = response.token;
        cy.request({
          method: 'POST',
          url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
          body: {
            email: response.body.user.email,
            password: user.password,
          },
        }).then((result) => {
          expect(result.status).to.eq(200);
          expect(result.body.user.firstName).to.eq(
            response.body.user.firstName
          );
          expect(result.body.user.lastName).to.eq(response.body.user.lastName);
          expect(result.body.user.email).to.eq(response.body.user.email);
        });
      }
    );
  });
  it('Log in user with missing parameters', () => {
    const properties = ['email', 'password'];
    const missingProperty =
      properties[Math.floor(Math.random() * properties.length)];

    const mutatedUser = { ...user };
    delete mutatedUser[missingProperty];
    cy.request({
      method: 'POST',
      url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
      failOnStatusCode: false,
      body: {
        email: mutatedUser.email,
        password: mutatedUser.password,
      },
    }).then((result) => {
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
            cy.request({
                method: 'POST',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
                failOnStatusCode: false,
                body: {
                  email: param.email,
                  password: param.password,
                },
              }).then((result) => {
                expect(result.status).to.eq(401)
              })
        })
        
      })
    
  });

  // after(() => {
  //     cy.deleteUser(token)
  // })

