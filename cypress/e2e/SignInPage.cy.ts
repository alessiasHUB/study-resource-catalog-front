describe('Testing Sign-in route', () => {
  it('Visits the sign-in page', () => {
    cy.visit('http://localhost:3000/signIn')
  })
});


//visit sign in page and click sign in button 
describe('Testing Sign-in button', () => {
  it('Visits the sign-in page, clicks sign-in button', () => {
    cy.visit('http://localhost:3000/signIn')
    cy.wait(500)
    cy.get('.sign-in-btn').click()
    //cy.visit('http://localhost:3000/')
    cy.get('.signed-in-user').should('be.visible')
  })
});

