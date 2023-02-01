// seems to run this test twice , unsure as to why -- couldbe good to google
describe('Testing Home page route', () => {
    it('Visits the Home page and checks for top recs', () => {
      cy.visit('http://localhost:3000/')
      cy.intercept('http://localhost:4000/resources/top').as('topResources')
      cy.wait('@topResources')
      cy.get('.top-res-container').should('be.visible')
    })
  });

