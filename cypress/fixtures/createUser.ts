import { faker } from '@faker-js/faker';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthdate: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}
function createRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });
  const password = faker.internet.password();
  const birthdate = faker.date.birthdate().toISOString().split('T')[0];
  const phone = faker.string.numeric(10);
  const street1 = faker.location.streetAddress();
  const street2 = faker.location.secondaryAddress();
  const city = faker.location.city();
  const stateProvince = faker.location.state();
  const postalCode = faker.location.zipCode();
  const country = faker.location.country();

  return {
    email,
    firstName,
    lastName,
    password,
    birthdate,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country,
  };
}

export { createRandomUser };
