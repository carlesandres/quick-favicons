describe('A page', () => {
  it('renders', () => {
    cy.visit('/');
    cy.contains('Quick Favicon');
  });
});
