import { createRandomUser } from '../../../fixtures/createUser';

describe('Contacts API tests', () => {
  let token;
    it('Update user', () => {
        const user1 = createRandomUser();
        const user2 = createRandomUser();
        cy.addUser(user1.firstName, user1.lastName, user1.email, user1.password).then((response) => {
          token = response.token
            cy.request({
                method: 'PATCH',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                auth: {
                    bearer: token
                  },
                  body: {
                    firstName: user2.firstName,
                    lastName: user2.lastName,
                    email: user2.email,
                    password: user2.password,
                  },
              }).then((result) => {
                expect(result.status).to.eq(200);
                expect(result.body.firstName).to.not.eq(response.user.firstName)
                expect(result.body.lastName).to.not.eq(response.user.lastName)
                expect(result.body.email).to.not.eq(response.user.email)
              })
        })
        
    })
    after(() => {
      cy.deleteUser(token)
    })
})