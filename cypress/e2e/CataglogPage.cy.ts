// lcick the first element in the dom within the set of DOM elements that matches the comments button
describe('Testing Catalog page route', () => {
    it('Visits the catalog page', () => {
      cy.visit('http://localhost:3000/catalog')
      //improve cy.wait by asking it to find it only whne it has loaded onto the page 
      cy.wait(500)
      cy.get('.comments-btn').first().click()
      cy.get('.comment-ctn')
      cy.log('Cypress logging')

    })
  });
//this is showing how to do the same thing, but intercepts the get request rather than waiting a specific amount of time
  describe('testing to find comments when appear', () => {
    it('Visits the comment section on catalog page', () => {
        cy.visit('http://localhost:3000/catalog')
        cy.intercept('http://localhost:4000/resources').as('catalogPageComments')
        cy.wait('@catalogPageComments')
        cy.get('.comments-btn').first().click()
        cy.get('.comment-ctn')
    })
  })