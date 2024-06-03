import { faker } from '@faker-js/faker';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
function createRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });
  const password = faker.internet.password();

  return {
    email,
    firstName,
    lastName,
    password,
  };
}

export { createRandomUser };
