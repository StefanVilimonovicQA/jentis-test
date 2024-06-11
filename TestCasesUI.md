**UI**
    **Add Contact**
        - Add new contact and assert response status code on contact submition
        - Add New Contact Validations for mandatory fields, where on submitting false form, assertion makes sure that you don't go to a new page
    **Login**
        - Successfull login and assert page elements to make sure, we landed on the right page
        - Login with invalid credentials and assert Frontend error messages
        - Login with empty credentials and assert Frontend error messages
    **Signup**
        - Cancel signining up user and assert page, we are redirected to
        - Signup user, wait for request to be completed and assert page redirection and elements
        - Signup user validations, where depending on parameter, we are asserting correct error message tied for specific parameter

         