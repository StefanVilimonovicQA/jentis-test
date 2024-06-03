Cypress.Commands.add('addUser', (firstName, lastName, email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://thinking-tester-contact-list.herokuapp.com/users',
        failOnStatusCode: false,
        body: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      }).then((response) => {
        return response
      })
})
Cypress.Commands.add('deleteUser', (token) => {
  cy.request({
    method: 'DELETE',
    url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
    auth: {
        bearer: token
      }
  }).then((response) => {
    expect(response.status).to.eq(200);
  })
})