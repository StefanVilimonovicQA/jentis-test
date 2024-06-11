import { faker } from '@faker-js/faker';
import { loginPage } from '../../support/pageObjects/loginPage';
describe('Login UI tests', () => {
  const username = 'test@ui.com';
  const password = 'test123';
  beforeEach(() => {
    cy.visit('/').get('h1').should('have.text', 'Contact List App');
    cy.intercept('/users/login').as('loginAPI');
  });
  it('Successful login', () => {
    loginPage.email(username);
    loginPage.password(password);
    loginPage.submit().click();
    cy.wait('@loginAPI');
    cy.get('h1').should('have.text', 'Contact List');
    cy.url().should('include', '/contactList');
  });
  it('Login with invalid credentials', () => {
    const invalidCredentials = [
      { email: faker.internet.email(), password: faker.string.uuid() },
      { email: faker.internet.email(), password: password },
      { email: username, password: faker.string.uuid() },
    ];

    invalidCredentials.forEach((cred) => {
      cy.log(`***Email value: ${cred.email}***`);
      cy.log(`***Password value: ${cred.password}***`);
      loginPage.email(cred.email);
      loginPage.password(cred.password);
      loginPage.submit().click();
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
      cy.log(`***Email value: ${cred.email}***`);
      cy.log(`***Password value: ${cred.password}***`);

      loginPage.email(cred.email);
      loginPage.password(cred.password);
      loginPage.submit().click();
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
