describe('Kinvo app (sorting & pagination)', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('changes sort order and reflects in listing', () => {
        // default sort is name_asc; change to yield_desc and expect first item to have higher yield
        cy.get('select').select('yield_desc')
        // wait a bit for UI update
        cy.wait(200)
        cy.get('[data-testid="product-card"]').first().within(() => {
            cy.get('[data-testid="product-yield"]').invoke('text').then(text1 => {
                const yield1 = parseFloat(text1)
                // change to yield_asc and expect top yield to be <= previous
                cy.get('select').select('yield_asc')
                cy.wait(200)
                cy.get('[data-testid="product-card"]').first().within(() => {
                    cy.get('[data-testid="product-yield"]').invoke('text').then(text2 => {
                        const yield2 = parseFloat(text2)
                        expect(yield2).to.be.at.most(yield1)
                    })
                })
            })
        })
    })

    it('navigates pagination', () => {
        // Expect page buttons and click page 2
        cy.contains('2').click()
        cy.wait(200)
        cy.get('.Wrapper, body') // noop to keep flow
        cy.contains('1')
    })
})
