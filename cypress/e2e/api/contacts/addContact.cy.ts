import { createRandomUser } from '../../../fixtures/createUser';
describe('Contacts API tests', () => {
  it('Add contact', () => {
    const user = createRandomUser();
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        cy.request({
          method: 'POST',
          url: '/contacts',
          auth: {
            bearer: response.body.token,
          },
          body: {
            firstName: user.firstName,
            lastName: user.lastName,
            birthdate: user.birthdate,
            email: user.email,
            phone: user.phone,
            street1: user.street1,
            street2: user.street2,
            city: user.city,
            stateProvince: user.stateProvince,
            postalCode: user.postalCode,
            country: user.country,
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.include.keys(
            'firstName',
            'lastName',
            'birthdate',
            'email',
            'phone',
            'street1',
            'street1',
            'city',
            'stateProvince',
            'postalCode',
            'country'
          );
        });
      }
    );
  });
  it('Add contact with missing property', () => {
    const user = createRandomUser();
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        const properties = [
          'firstName',
          'lastName',
          'birthdate',
          'email',
          'phone',
          'street1',
          'street1',
          'city',
          'stateProvince',
          'postalCode',
          'country',
        ];
        const missingProperty =
          properties[Math.floor(Math.random() * properties.length)];
          cy.log(missingProperty)


        const mutatedUser = { ...user };
        delete mutatedUser[missingProperty];

        cy.request({
          method: 'POST',
          url: '/contacts',
          failOnStatusCode: false,
          auth: {
            bearer: response.body.token,
          },
          body: {
            firstName: mutatedUser.firstName,
            lastName: mutatedUser.lastName,
            birthdate: mutatedUser.birthdate,
            email: mutatedUser.email,
            phone: mutatedUser.phone,
            street1: mutatedUser.street1,
            street2: mutatedUser.street2,
            city: mutatedUser.city,
            stateProvince: mutatedUser.stateProvince,
            postalCode: mutatedUser.postalCode,
            country: mutatedUser.country,
          },
        }).then((response) => {
          if(missingProperty === 'firstname' || missingProperty ==='lastName'){
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq(`Contact validation failed: ${missingProperty}`)
          }
          else{
            expect(response.status).to.eq(201);
          }
          
        });
      }
    );
  });
});
