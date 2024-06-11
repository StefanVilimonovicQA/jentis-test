**API**
    **Users**
        **Add User**
            - Add user and assert response keys
            - Add user with missing properties and assert error messages
            - Add user with invalid email format and assert error messages
            - Add user with existing email and assert error messages
        **Delete User**
            - Delete user and assert response status code 
            - Delete user with empty authorization token and assert error messages and response status code
            - Delete user with invalid authorization token and assert error messages and response status code
            - Delete already deleted user and assert error message and response status code
        **Get User Profile**
            - Get user profile and assert response status code along with user's information
            - Get user profile with empty authorization token  and assert error message and response status code
            - Get user profile with invalid authorization token  and assert error message and response status code
        **Login User**
            - Log in user and assert response status code and logged user's info
            - Log in user with missing parameters and assert response status code
            - Log in user with invalid parameters and assert response status code
        **Logout User**
            - Log out user and assert response status code
            - Log out user with empty authorization token and assert response status code and error messages
            - Log out user with invalid authorization token and assert response status code and error messages
            - Log out user which is already logged out and assert response status code and error messages
        **Update User**
            - Update user and assert response status code and updated user's information
            - Update user with missing properties and assert response status code
            - Update user with empty properties and assert status code and error messages
    **Contacts**
        **Add Contact**
            - Add contact and assert response status code and response body that includes all necessary keys and that is not empty
            - Add contact with missing property and assert response status code and messages accordingly to missing property
            - Add contact with empty properties and assert response status code and messages accordingly to status code
        **Delete Contact**
            - Delete contact and assert response status code and message
            - Delete contact with empty authorization token and assert response status code and message
            - Delete contact with invalid authorization token and assert response status code and message
            - Delete already deleted contact and assert response status code and message
        **Get Contact**
            - Get contact and assert response status code and that received body is not empty
            - Get contact with empty authorization token and assert response status code and message
            - Get contact with invalid authorization token and assert response status code and message
            - Get contact with empty contact Id and assert response status code and body
            - Get contact with invalid contact Id and assert response status code and error messages
        **Get Contact List**
            - Get contact list and assert response status code and body
            - Get contact list with empty authorization token and assert response status code and error message
            - Get contact list with invalid authorization token and assert response status code and error message
        **Update Contacts**
            - Update contact and assert response status code and updated user's info
            - Update contact with missing properties and assert response status code and messages accordingly to missing property
            - Update contact with empty properties and assert response status code and messages accordingly to response status code
    **Addition**
        - I have created a small helper test, cleanupContacts.cy.ts, just to remove all created Contacts during testing the application

