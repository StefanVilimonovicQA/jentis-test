import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
    it('Delete user', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            console.log(response)
            cy.request({
                method: 'DELETE',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                auth: {
                    bearer: response.body.token
                  }
              }).then((result) => {
                expect(result.status).to.eq(200);
              })
        })
        
    })
    it('Delete user with empty authorization token', () => {
            cy.request({
                method: 'DELETE',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                failOnStatusCode: false,
                auth: {
                    bearer: ""
                  }
              }).then((result) => {
                expect(result.status).to.eq(401);
                expect(result.body.error).to.eq("Please authenticate.")
              })
        
        
    })
    it('Delete user with invalid authorization token', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
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