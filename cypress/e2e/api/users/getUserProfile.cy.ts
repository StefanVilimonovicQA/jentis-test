import { createRandomUser } from '../../../fixtures/createUser';

describe('Contacts API tests', () => {
    let token;
    it('Get user profile', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            token = response.token;
            cy.request({
                method: 'GET',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                auth: {
                    bearer: token
                  }
              }).then((result) => {
                expect(result.status).to.eq(200);
                expect(result.body.firstName).to.eq(response.user.firstName)
                expect(result.body.lastName).to.eq(response.user.lastName)
                expect(result.body.email).to.eq(response.user.email)
              })
        })
        
    })
    after(() => {
        cy.deleteUser(token);
    })
})