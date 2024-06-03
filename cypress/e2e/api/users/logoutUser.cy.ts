import { createRandomUser } from '../../../fixtures/createUser';

describe('Contacts API tests', () => {
    let token;
    it('Log out user', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            token = response.token
            cy.request({
                method: 'POST',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/logout',
                auth: {
                    bearer: token
                  }
              }).then((result) => {
                expect(result.status).to.eq(200);
              })
        })
        
    })
    
})