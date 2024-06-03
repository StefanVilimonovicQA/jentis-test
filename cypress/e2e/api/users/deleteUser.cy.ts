import { createRandomUser } from '../../../fixtures/createUser';

describe('Contacts API tests', () => {
    it('Delete user', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            cy.request({
                method: 'DELETE',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                auth: {
                    bearer: response.token
                  }
              }).then((result) => {
                expect(result.status).to.eq(200);
              })
        })
        
    })
})