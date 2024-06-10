import { faker } from '@faker-js/faker';
describe('Login UI tests', () => {
    const username = 'test@ui.com'
    const password = 'test123'
  beforeEach(() => {
    cy.visit('/').get('h1').should('have.text', 'Contact List App');
    cy.intercept('/users/login').as('loginAPI');
  });
  it('Successful login', () => {
    cy.get('#email')
      .should('have.attr', 'placeholder', 'Email')
      .type(username);
    cy.get('#password')
      .should('have.attr', 'placeholder', 'Password')
      .type(password);
    cy.get('button#submit').click();
    cy.wait('@loginAPI');
    cy.get('h1').should('have.text', 'Contact List');
    cy.url().should('include','/contactList')
  });
  it('Login with invalid credentials', () => {
    const invalidCredentials = [
      { email: faker.internet.email(), password: faker.string.uuid() },
      { email: faker.internet.email(), password: password },
      { email: username, password: faker.string.uuid() },
    ];

    invalidCredentials.forEach((cred) => {
        cy.log(`***Email value: ${cred.email}***`)
        cy.log(`***Password value: ${cred.password}***`)
      cy.get('#email').clear()
        .should('have.attr', 'placeholder', 'Email')
        .type(cred.email);
      cy.get('#password').clear()
        .should('have.attr', 'placeholder', 'Password')
        .type(cred.password);
      cy.get('button#submit').click();

      cy.wait('@loginAPI').then((xhr) => {
        expect(xhr.response.statusCode).to.eq(401);
      });
      cy.get('span#error')
        .should('be.visible')
        .and('exist')
        .and('have.text', 'Incorrect username or password');
    });
  });
  it('Login with empty credentials', () => {
    const emptyCredentials = [
        { email: ' ', password: ' ' },
        { email: ' ', password: password },
        { email: username, password: ' ' },
      ];
  
      emptyCredentials.forEach((cred) => {
        cy.log(`***Email value: ${cred.email}***`)
        cy.log(`***Password value: ${cred.password}***`)

        cy.get('#email').clear()
          .should('have.attr', 'placeholder', 'Email')
          .type(cred.email);
        cy.get('#password').clear()
          .should('have.attr', 'placeholder', 'Password')
          .type(cred.password);
        cy.get('button#submit').click();
  
        cy.wait('@loginAPI').then((xhr) => {
          expect(xhr.response.statusCode).to.eq(401);
        });
        cy.get('span#error')
          .should('be.visible')
          .and('exist')
          .and('have.text', 'Incorrect username or password');
      });
  });
});
