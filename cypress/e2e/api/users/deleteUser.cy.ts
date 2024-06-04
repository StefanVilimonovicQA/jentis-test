import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
  let token
    it('Delete user', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
          token = response.body.token
            cy.request({
                method: 'DELETE',
                url: '/users/me',
                auth: {
                    bearer: token
                  }
              }).then((result) => {
                expect(result.status).to.eq(200);
              })
        })
        
    })
    it('Delete user with empty authorization token', () => {
            cy.request({
                method: 'DELETE',
                url: `/users/me`,
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
            url: '/users/me',
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