**Description**

- Different approaches on writing test code and assertions.

- For mocking data [fakerjs](https://fakerjs.dev/) was used.

- In fixtures file is create User function which generates all data needed for Users and Contacts.

- In support commands file we have Custom API commands to reduce duplicated code and reuse it in UI tests in order to speed up test execution.

- In support types file is type definition for all Custom API Commands, so we could know type of params and functions + it gives as a nice documentation on hover action over Custom Command in tests.

- In support pageObjects file we have classes for UI pages with definition of page elemenets for easier selectors access.

- For reporting, [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) was used.

**Execution**

- In package.json are two scripts:
    - for exection in UI mode: npm run cypress:open
    - for exection in headless mode: npm run cypress:headless

- Report is generated, **Only** on execution in headless mode and on every new execution, old report is deleted and new one is generated.