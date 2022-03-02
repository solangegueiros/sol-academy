describe('visit classes', () => {
  const accessClassesPage = (lang: string) => {
    cy.visit('/' + lang + '');
    cy.get('[data-cy=classes]').click();
    cy.get('[data-cy=sidebarOption]').should('have.length', 1);
    cy.get(
      '[data-cy="sidebarOption"] > :nth-child(1) > .justify-between'
    ).click();
    cy.get(
      '[data-cy="sidebarOption"] > :nth-child(1) > :nth-child(2) > :nth-child(1) > a'
    ).click();
    cy.get('.text-4xl').should('have.length', 1);
  };

  it('Access classes page using en', () => {
    accessClassesPage('en');
  });

  it('Access classes page using es', () => {
    accessClassesPage('es');
  });

  it('Access classes page using pt', () => {
    accessClassesPage('pt');
  });
});
