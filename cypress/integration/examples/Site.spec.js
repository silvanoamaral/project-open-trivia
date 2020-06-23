/// <reference types="cypress" />

context('E2E Test', () => {
  it('Click categories', () => {
    cy.visit('http://localhost:8080/')
    cy.get('.listcategories .list > div:first').click()
  })

  it('choose answer and click reply button', () => {
    cy.get('.questions li:first').click()
    cy.wait(500)
    cy.get('.btn button').click()
  })

  it('Click button advance', () => {
    cy.wait(500)
    cy.get('.lightbox > div button').click()
  })

  it('Click button Close', () => {
    cy.wait(500)
    cy.get('.questions .title span').click()
  })  
})
