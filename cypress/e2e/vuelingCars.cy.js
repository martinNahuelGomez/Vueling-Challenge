describe('Vueling cars rental page', () => {
  beforeEach(() => {
    cy.viewport(430, 932)
    cy.visit('https://cars.vueling.com/')
    cy.fixture('testData.json').then((testData) => {
      const locators = testData.locators;
      cy.get(locators.submitButton).should('be.visible');
    })
    cy.clearCookies()
  })

  it('Set searching data', () => {
    cy.fixture('testData.json').then((testData) => {
      const locators = testData.locators
      const data = testData.data

      // Type the location to trigger the dropdown
      cy.get(locators.pickupLocationInput).type(data.pickupLocation)

      // Wait for the dropdown to appear and select the matching item
      cy.get(locators.pickupLocationAirportDropdown).contains('li', data.pickupLocationDropdownMenuOption).click()

      // Set the dates
      cy.setDateFromToday(locators.pickupDate, 3)
      cy.setDateFromToday(locators.returnDate, 5)

      // Select the driver age
      cy.selectDriverAge(data.driverAge)

      // Submit the form
      //cy.get(locators.submitButton).invoke('removeAttr', 'target').click()
      //cy.wait(2000)
    })
  })
})