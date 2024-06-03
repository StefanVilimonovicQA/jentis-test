import { createRandomUser } from '../../../fixtures/createUser';
describe('Contacts API tests', () => {
  let token;
  it('Add user', () => {
    const user = createRandomUser()
    let firstName = user.firstName;
    let lastName = user.lastName;
    let email = user.email;
    let password = user.password;
    cy.request({
      method: 'POST',
      url: 'https://thinking-tester-contact-list.herokuapp.com/users',
      body: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    }).then((response) => {
        token = response.body.token
        expect(response.status).to.eq(201)
        expect(response.body.user).to.have.all.keys('_id', 'firstName', 'lastName', 'email', '__v');
    });
    })
    after(() => {
      cy.deleteUser(token);
    })
  });
