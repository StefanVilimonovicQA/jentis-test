import { createRandomUser } from '../../fixtures/createUser';
import { addContactPage } from '../../support/pageObjects/addContactPage';

const username = 'test@ui.com';
const password = 'test123';
describe('Add Contact UI tests', () => {
  const user = createRandomUser();
  beforeEach(() => {
    cy.loginUser(username, password).then(() => {
      cy.visit('/contactList');
      cy.url().should('include', '/contactList');
      cy.get('h1').should('have.text', 'Contact List');
      cy.intercept('/contacts').as('createContact');
    });
  });
  it('Add New Contact', () => {
    addContactPage.addContactBtn().click();
    addContactPage.firstName(user.firstName);
    addContactPage.lastName(user.lastName);
    addContactPage.birthdate(user.birthdate);
    addContactPage.email(user.email);
    addContactPage.phone(user.phone);
    addContactPage.street1(user.street1);
    addContactPage.street2(user.street2);
    addContactPage.city(user.city);
    addContactPage.stateProvince(user.stateProvince);
    addContactPage.postalCode(user.postalCode);
    addContactPage.country(user.country);
    addContactPage.submitBtn().click();

    cy.wait('@createContact').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(201);
    });
  });
  it('Add New Contact Validations for mandatory fields', () => {
    addContactPage.addContactBtn().click();
    addContactPage.submitBtn().click();
    cy.url().should('include', '/addContact');
  });
});
