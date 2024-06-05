/// <reference types="cypress" />
export {};
declare global {
  namespace Cypress {
    export interface Chainable {
      /**
       * Create new user.
       * @param {string} firstName - User first name.
       * @param {string} lastName - User last name.
       * @param {string} email - User email.
       * @param {string} password - User password.
       */
      addUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string
      ): Chainable;

      /**
       * Delete user.
       * @param {string} token - Token of user to be deleted.
       */
      deleteUser(token: string): Chainable;
      /**
       * Login user.
       * @param {string} email - User email.
       * @param {string} password - User password.
       */
      loginUser(email: string, password: string): Chainable;
      /**
       * Logout user.
       * @param {string} token - User auth token.
       */
      logoutUser(token: string): Chainable;
      /**
       * Get user profile.
       * @param {string} token - User auth token.
       */
      getUser(token: string): Chainable;
      /**
       * Update user.
       * @param {string} token - User auth token.
       * @param {string} firstName - User first name.
       * @param {string} lastName - User last name.
       * @param {string} email - User email.
       * @param {string} password - User password.
       */
      updateUser(
        token: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
      ): Chainable;
    }
  }
}
