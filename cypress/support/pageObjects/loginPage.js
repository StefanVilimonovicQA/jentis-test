class LoginPage {
  email(email) {
    return cy
      .get('#email')
      .clear()
      .should('have.attr', 'placeholder', 'Email')
      .type(email);
  }
  password(password) {
    return cy
      .get('#password')
      .clear()
      .should('have.attr', 'placeholder', 'Password')
      .type(password);
  }
  submit() {
    return cy.get('button#submit');
  }
  signUp() {
    return cy.get('button#signup');
  }
}
export const loginPage = new LoginPage();
