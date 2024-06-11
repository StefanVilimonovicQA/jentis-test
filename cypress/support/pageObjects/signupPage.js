class SignupPage {
  signupBtn() {
    return cy.get('button#signup');
  }
  firstName(firstName) {
    return cy.get('input#firstName').clear().type(firstName);
  }
  lastName(lastName) {
    return cy.get('input#lastName').clear().type(lastName);
  }
  email(email) {
    return cy.get('input#email').clear().type(email);
  }
  password(password) {
    return cy.get('input#password').clear().type(password);
  }
  submitBtn() {
    return cy.get('button#submit');
  }
  cancelBtn() {
    return cy.get('button#cancel');
  }
}
export const signupPage = new SignupPage();
