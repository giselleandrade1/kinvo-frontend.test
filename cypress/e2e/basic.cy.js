describe('Kinvo app (basic flows)', () => {
  it('loads and shows main title and search', () => {
    cy.visit('/')
    cy.contains(/Minhas Rendas Fixas/i)
    cy.get('input[placeholder="Pesquisar produtos"]').should('exist')
  })

  it('filters items by search', () => {
    cy.visit('/')
    cy.get('input[placeholder="Pesquisar produtos"]').type('CDB')
    cy.contains(/CDB/i).should('exist')
  })
})
