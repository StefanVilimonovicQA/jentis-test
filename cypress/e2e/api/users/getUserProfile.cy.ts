import { createRandomUser } from '../../../fixtures/createUser';
import { faker } from '@faker-js/faker';

describe('Contacts API tests', () => {
    let token;
    it('Get user profile', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            token = response.body.token;
            cy.request({
                method: 'GET',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                auth: {
                    bearer: token
                  }
              }).then((result) => {
                expect(result.status).to.eq(200);
                expect(result.body.firstName).to.eq(response.body.user.firstName)
                expect(result.body.lastName).to.eq(response.body.user.lastName)
                expect(result.body.email).to.eq(response.body.user.email)
              })
        })
        
    })
    it('Get user profile with empty authorization token', () => {
        cy.request({
            method: 'GET',
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
    it('Get user profile with invalid authorization token', () => {
        cy.request({
            method: 'GET',
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
    after(() => {
        cy.deleteUser(token);
    })
})