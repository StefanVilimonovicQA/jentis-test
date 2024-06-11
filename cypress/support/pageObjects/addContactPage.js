class addContactPage {
  addContactBtn() {
    return cy.get('button#add-contact');
  }
  submitBtn() {
    return cy.get('button#submit');
  }
  cancelBtn() {
    return cy.get('button#cancel');
  }
  firstName(firstName) {
    return cy.get('input#firstName').type(firstName);
  }
  lastName(lastName) {
    return cy.get('input#lastName').type(lastName);
  }
  birthdate(birthdate) {
    return cy.get('input#birthdate').type(birthdate);
  }
  email(email) {
    return cy.get('input#email').type(email);
  }
  phone(phone) {
    return cy.get('input#phone').type(phone);
  }
  street1(street1) {
    return cy.get('input#street1').type(street1);
  }
  street2(street2) {
    return cy.get('input#street2').type(street2);
  }
  city(city) {
    return cy.get('input#city').type(city);
  }
  stateProvince(stateProvince) {
    return cy.get('input#stateProvince').type(stateProvince);
  }
  postalCode(postalCode) {
    return cy.get('input#postalCode').type(postalCode);
  }
  country(country) {
    return cy.get('input#country').type(country);
  }
}
export const addContactPage = new addContactPage();
