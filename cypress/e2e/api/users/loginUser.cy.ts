import { createRandomUser } from '../../../fixtures/createUser';

describe('Contacts API tests', () => {
    let token
    it('Log in user', () => {
        const user = createRandomUser()
        cy.addUser(user.firstName, user.lastName, user.email, user.password).then((response) => {
            console.log(response)
            token = response.token
            cy.request({
                method: 'POST',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
                body: {
                    email:  response.user.email,
                    password: user.password,
                  },
              }).then((result) => {
                expect(result.status).to.eq(200);
                expect(result.body.user.firstName).to.eq(response.user.firstName)
                expect(result.body.user.lastName).to.eq(response.user.lastName)
                expect(result.body.user.email).to.eq(response.user.email)
              })
        })
        
    })
    after(() => {
        cy.deleteUser(token)
    })
})