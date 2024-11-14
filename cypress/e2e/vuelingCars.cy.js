describe('Vueling cars rental page tests', () => {
  beforeEach(() => {
    cy.viewport(430, 932)
    cy.visit('https://cars.vueling.com/')
    cy.fixture('testData.json').then((testData) => {
      const locators = testData.locators
      const data = testData.data
      cy.get(locators.submitButton).should('be.visible')
      cy.get(locators.pickupLocationInput).type(data.pickupLocation)
      cy.get(locators.pickupLocationAirportDropdown).contains('li', data.pickupLocationDropdownMenuOption).click()
      cy.setDateFromToday(locators.pickupDate, 3)
      cy.setDateFromToday(locators.returnDate, 5)
      cy.selectDriverAge(data.driverAge)
      // TODO: Clicking the search button is not working and therefore i added the cy visit to the a resulting url of the search (dates are hardcoded in the url for now)
      // cy.get(locators.submitButton).invoke('removeAttr', 'target').click()
      cy.visit('https://cars.vueling.com/es/book?pickupDateTime=2024-11-20T10%3A00&returnDateTime=2024-11-22T10%3A00&age=30&clientID=198349&ct=MP&countryID=ES&curr=EUR&elID=1591731571862260&&pickupCountryCode=ES&residenceID=ES&returnCountryCode=ES&pickupID=1774&pickupName=Barcelona%20-%20Aeropuerto&returnID=1774&returnName=Barcelona%20-%20Aeropuerto#/vehicles')
      cy.wait(7000)
      cy.scrollTo('bottom')
      cy.wait(1000)
      cy.scrollTo('bottom')
      cy.get(`${locators.carList} ${locators.carListItem}`).contains('SUV').parents(locators.carListItem).find(locators.selectCarButton).click({force: true})
      cy.get(locators.selectedCar).should('contain', 'SUV')
    })
    cy.clearCookies()
  })

  it('Attempt to rent with basic rate and assert insurance disclaimer', () => {
    cy.fixture('testData.json').then((testData) => {
      const locators = testData.locators
      const insuranceType = testData.data.insurance.basic
      cy.selectInsuranceTypeAndAssertCostDifference(insuranceType, 0)
      cy.get(locators.insuranceHeader).should('contain', 'Aún no estás totalmente cubierto')
    })
  })

  it('Attempt to rent with premium rate and assert premium coverage at final price list of items', () => {
    cy.fixture('testData.json').then((testData) => {
      const locators = testData.locators
      const insuranceType = testData.data.insurance.premium
      cy.selectInsuranceTypeAndAssertCostDifference(insuranceType, 64.0)
      cy.get(locators.finalPriceDisplayButton).click()
      cy.get(locators.finalPriceRow).contains('Cobertura Premium').should('be.visible')
    })
  })
})