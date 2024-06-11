import { createRandomUser } from '../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Signup UI tests', () => {
  const user = createRandomUser();
  beforeEach(() => {
    cy.intercept('/users').as('addUser');
    cy.visit('/').get('h1').should('have.text', 'Contact List App');
    cy.get('button#signup').click();
    cy.url().should('include', '/addUser');
    cy.get('h1').should('have.text', 'Add User');
  });
  it('Cancel add user', () => {
    cy.get('button#cancel').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('have.text', 'Contact List App');
  });
  it('Add user', () => {
    cy.get('input#firstName').type(user.firstName);
    cy.get('input#lastName').type(user.lastName);
    cy.get('input#email').type(user.email);
    cy.get('input#password').type(user.password);

    cy.get('button#submit').click();
    cy.wait('@addUser');
    cy.url().should('include', '/contactList');
    cy.get('h1').should('have.text', 'Contact List');
  });
  it('Add user validations', () => {
    const credentials = [
      {
        firstName: `Frontend Testing user ${user.firstName}`,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
      {
        firstName: user.firstName,
        lastName: `Frontend Testing user ${user.lastName}`,
        email: user.email,
        password: user.password,
      },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: `Very looooong ${user.email}`,
        password: user.password,
      },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: faker.string.alphanumeric(6),
      },
    ];

    const getErrorMessage = (cred) => {
      if (cred.firstName && cred.firstName.length > 20) {
        return `User validation failed: firstName: Path \`firstName\` (${cred.firstName}) is longer than the maximum allowed length (20).`;
      } else if (cred.lastName && cred.lastName.length > 20) {
        return `User validation failed: lastName: Path \`lastName\` (${cred.lastName}) is longer than the maximum allowed length (20).`;
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cred.email)
      ) {
        return 'User validation failed: email: Email is invalid';
      } else if (cred.password.length < 7) {
        return 'is shorter than the minimum allowed length (7).';
    }
    };

    credentials.forEach((cred) => {
      cy.log(`***Credentials are: ${JSON.stringify(cred)}***`);
      cy.get('input#firstName').clear().type(cred.firstName);
      cy.get('input#lastName').clear().type(cred.lastName);
      cy.get('input#email').clear().type(cred.email);
      cy.get('input#password').clear().type(cred.password);

      cy.get('button#submit').click();
      cy.wait('@addUser').then((xhr) => {
        expect(xhr.response.statusCode).to.eq(400);
      });

      cy.get('span#error')
        .invoke('text')
        .then((text) => {
          const errorMessage = getErrorMessage(cred);
          expect(text.replace(/`/g, '')).to.include(
            errorMessage.replace(/`/g, '')
          );
        });
    });
  });
});
