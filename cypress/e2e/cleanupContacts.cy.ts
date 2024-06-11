describe('Helpers', () => {
  let token;
  before(() => {
    cy.loginUser('test@ui.com', 'test123').then((response1) => {
      token = response1.body.token;
    });
  });
  it('Delete All contacts via API', () => {
    cy.getContactList(token).then((response) => {
      for (let i = 0; i < response.body.length; i++) {
        cy.deleteContact(token, response.body[i]._id).then((res) => {
          expect(res.status).to.eq(200);
        });
      }
    });
    cy.getContactList(token).then((resp) => {
      expect(resp.body).to.be.empty;
    });
  });
});
