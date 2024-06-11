import { createRandomUser } from '../../fixtures/createUser';

const username = 'test@ui.com';
const password = 'test123';
describe('Add Contact UI tests', () => {
  const user = createRandomUser();
  beforeEach(() => {
    cy.loginUser(username, password).then(() => {
      cy.visit('/contactList');
      cy.url().should('include', '/contactList');
      cy.get('h1').should('have.text', 'Contact List');
      cy.intercept('/contacts').as('createContact')
    });
  });
  it('Add New Contact', () => {
    cy.get('button#add-contact').click();
    cy.get('input#firstName').type(user.firstName);
    cy.get('input#lastName').type(user.lastName);
    cy.get('input#birthdate').type(user.birthdate);
    cy.get('input#email').type(user.email);
    cy.get('input#phone').type(user.phone);
    cy.get('input#street1').type(user.street1);
    cy.get('input#street2').type(user.street2);
    cy.get('input#city').type(user.city);
    cy.get('input#stateProvince').type(user.stateProvince);
    cy.get('input#postalCode').type(user.postalCode);
    cy.get('input#country').type(user.country);
    cy.get('button#submit').click();
   
    cy.wait('@createContact').then((xhr) => {
        expect(xhr.response.statusCode).to.eq(201);
    })
  });
  it('Add New Contact Validations for mandatory fields', () => {
    cy.get('button#add-contact').click();
    cy.get('button#submit').click();
    cy.url().should('include','/addContact')
  })
});
