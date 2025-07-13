describe('영화 검색', () => {
  it('검색 페이지 접근', () => {
    cy.visit('/')
    cy.get('header .nav-link.active')
      .contains('Search')

  })
  it('영화검색합니다', () => {
    cy.visit('/')
    cy.get('input.form-control').type('frozen')
    cy.get('select.form-select:nth-child(2)').select('30')
    cy.get('button.btn').contains('Apply').click()
    cy.wait(2000)
    cy.get('.movie').should('have.length', 30)
  })
  it('겨울왕국2 영화 아이템 선택', () => {
    cy.visit('/')
    cy.get('input.form-control').type('frozen')
    cy.get('select.form-select:nth-child(2)').select('30')
    cy.get('button.btn').contains('Apply').click()
    cy.wait(2000)
    cy.get('.movie').should('have.length', 30)
    cy.get('.movie .title').contains('Frozen II').click()
  })
})