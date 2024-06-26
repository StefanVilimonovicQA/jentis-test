Cypress.Commands.add('addUser', (firstName, lastName, email, password) => {
  cy.request({
    method: 'POST',
    url: '/users',
    failOnStatusCode: false,
    body: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  }).then((response) => {
    return response;
  });
});
Cypress.Commands.add('deleteUser', (token) => {
  cy.request({
    method: 'DELETE',
    url: '/users/me',
    failOnStatusCode: false,
    auth: {
      bearer: token,
    },
  });
});
Cypress.Commands.add('loginUser', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/users/login',
    failOnStatusCode: false,
    body: {
      email: email,
      password: password,
    },
  });
});
Cypress.Commands.add('logoutUser', (token) => {
  cy.request({
    method: 'POST',
    url: '/users/logout',
    failOnStatusCode: false,
    auth: {
      bearer: token,
    },
  });
});
Cypress.Commands.add('getUser', (token) => {
  cy.request({
    method: 'GET',
    url: '/users/me',
    failOnStatusCode: false,
    auth: {
      bearer: token,
    },
  });
});
Cypress.Commands.add(
  'updateUser',
  (token, firstName, lastName, email, password) => {
    cy.request({
      method: 'PATCH',
      url: '/users/me',
      failOnStatusCode: false,
      auth: {
        bearer: token,
      },
      body: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });
  }
);
Cypress.Commands.add(
  'addContact',
  (
    token,
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country
  ) => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      failOnStatusCode: false,
      auth: {
        bearer: token,
      },
      body: {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        phone: phone,
        street1: street1,
        street2: street2,
        city: city,
        stateProvince: stateProvince,
        postalCode: postalCode,
        country: country,
      },
    });
  }
);
Cypress.Commands.add('getContactList', (token, contactId?) => {
  let url = '/contacts';
  if (contactId) {
    url = `/contacts/${contactId}`;
  }
  cy.request({
    method: 'GET',
    url,
    failOnStatusCode: false,
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add(
  'updateContact',
  (
    token,
    contactId,
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country
  ) => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      failOnStatusCode: false,
      auth: {
        bearer: token,
      },
      body: {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        phone: phone,
        street1: street1,
        street2: street2,
        city: city,
        stateProvince: stateProvince,
        postalCode: postalCode,
        country: country,
      },
    });
  }
);
Cypress.Commands.add('deleteContact', (token, contactId) => {
  cy.request({
    method: 'DELETE',
    url: `/contacts/${contactId}`,
    failOnStatusCode: false,
    auth: {
      bearer: token,
    },
  });
});
