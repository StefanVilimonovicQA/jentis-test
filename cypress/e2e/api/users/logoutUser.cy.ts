import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
    let token;
    const user = createRandomUser()

    it('Log out user', () => {
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            token = response.body.token
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
    it('Log out user with empty authorization token', () => {
            cy.request({
                method: 'POST',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/logout',
                failOnStatusCode: false,
                auth: {
                    bearer: ""
                  }
              }).then((result) => {
                expect(result.status).to.eq(401);
                expect(result.body.error).to.eq("Please authenticate.")
              })
        
        
    })
    it('Log out user with invalid authorization token', () => {
        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users/logout',
            failOnStatusCode: false,
            auth: {
                bearer: faker.string.uuid()
              }
          }).then((result) => {
            expect(result.status).to.eq(401);
            expect(result.body.error).to.eq("Please authenticate.")
          })
    
    
})
    
})