// seems to run this test twice , unsure as to why -- couldbe good to google
describe('Testing Home page route', () => {
    it('Visits the Home page', () => {
      cy.visit('http://localhost:3000/')
      cy.wait(500)
      cy.get('.recent-res').should('be.visible')
    })
  });