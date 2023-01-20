describe('Testing Sign-in route', () => {
  it('Visits the sign-in page', () => {
    cy.visit('http://localhost:3000/signIn')
  })
});

describe('Testing Home page route', () => {
  it('Visits the Home page', () => {
    cy.visit('http://localhost:3000/')
  })
});

describe('Testing Sign-in button', () => {
  it('Visits the sign-in page, clicks sign-in button', () => {
    cy.visit('http://localhost:3000/signIn')
    cy.get('.sign-in-btn').click()
    cy.get('.signed-in-user').should('be.visible')
  })
});