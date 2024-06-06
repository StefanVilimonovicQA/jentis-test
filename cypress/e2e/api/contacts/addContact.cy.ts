import { createRandomUser } from '../../../fixtures/createUser';
describe('Contacts API tests', () => {
  let token;
  const user2 = createRandomUser();
  before(() => {
    const user = createRandomUser();
    cy.addUser(user.firstName, user.lastName, user.email, user.password).then(
      (response) => {
        cy.loginUser(response.body.user.email, user.password).then(
          (response1) => {
            token = response1.body.token;
          }
        );
      }
    );
  });
  it('Add contact', () => {
    cy.addContact(
      token,
      user2.firstName,
      user2.lastName,
      user2.birthdate,
      user2.email,
      user2.phone,
      user2.street1,
      user2.street2,
      user2.city,
      user2.stateProvince,
      user2.postalCode,
      user2.country
    ).then((response) => {
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
      ).and.not.to.be.empty;
    });
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
        cy.log(missingProperty);

        const mutatedUser = { ...user };
        delete mutatedUser[missingProperty];

        cy.addContact(
          token,
          mutatedUser.firstName,
          mutatedUser.lastName,
          mutatedUser.birthdate,
          mutatedUser.email,
          mutatedUser.phone,
          mutatedUser.street1,
          mutatedUser.street2,
          mutatedUser.city,
          mutatedUser.stateProvince,
          mutatedUser.postalCode,
          mutatedUser.country
        ).then((response) => {
          if (
            missingProperty === 'firstname' ||
            missingProperty === 'lastName'
          ) {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include(
              `Contact validation failed: ${missingProperty}`
            );
          } else {
            expect(response.status).to.eq(201);
          }
        });
      }
    );
  });
  it('Add contact with empty properties', () => {
    const body = {
      firstName: user2.firstName,
      lastName: user2.lastName,
      birthdate: user2.birthdate,
      email: user2.email,
      phone: user2.phone,
      street1: user2.street1,
      street2: user2.street2,
      city: user2.city,
      stateProvince: user2.stateProvince,
      postalCode: user2.postalCode,
      country: user2.country,
    };
    const properties = Object.keys(body);
    properties.forEach((property) => {
      const requestBody = { ...body };
      requestBody[property] = '';
      cy.addContact(
        token,
        requestBody.firstName,
        requestBody.lastName,
        requestBody.birthdate,
        requestBody.email,
        requestBody.phone,
        requestBody.street1,
        requestBody.street2,
        requestBody.city,
        requestBody.stateProvince,
        requestBody.postalCode,
        requestBody.country
      ).then((results) => {
        if (results.status === 400) {
          cy.log(property);
          expect(results.status).to.eq(400);
          expect(results.body.message).to.include(
            `Contact validation failed: ${property}`
          );
        } else {
          cy.log(property);
          expect(results.status).to.eq(201);
        }
      });
    });
  });
});
