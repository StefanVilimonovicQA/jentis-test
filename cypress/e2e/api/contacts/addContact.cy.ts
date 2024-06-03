describe('Contacts API tests', () => {
  it('Add contact', () => {
    cy.request({
      method: 'POST',
      url: 'https://thinking-tester-contact-list.herokuapp.com/contacts',
      body: {
        firstName: 'John',
        lastName: 'Doe',
        birthdate: '1970-01-01',
        email: 'jdoe@fake.com',
        phone: '8005555555',
        street1: '1 Main St.',
        street2: 'Apartment A',
        city: 'Anytown',
        stateProvince: 'KS',
        postalCode: '12345',
        country: 'USA',
      },
    }).then((response) => {
      console.log(response);
    });
  });
  it.only('Get contact list', () => {
    cy.request(
      'GET',
      'https://thinking-tester-contact-list.herokuapp.com/contacts'
    );
  });
});
