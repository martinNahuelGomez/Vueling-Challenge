Cypress.Commands.add('setDateFromToday', (selector, daysToAdd) => {
    const today = new Date()
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + daysToAdd)

    const targetDay = futureDate.getDate()
    let targetMonth = futureDate.toLocaleString('default', { month: 'long' })
    const targetYear = futureDate.getFullYear()

    // Capitalize the first letter of the month
    targetMonth = targetMonth.charAt(0).toUpperCase() + targetMonth.slice(1)

    // Click on the date picker input to open the calendar
        cy.get(selector).click()

    // Navigate to the correct month and year if necessary
    function selectMonthYear() {
        cy.fixture('testData.json').then((testData) => {
            const locators = testData.locators
            cy.get(locators.datePickerHeader).then(($header) => {
                const currentMonthYear = $header.text()
                if (!currentMonthYear.includes(targetMonth) || !currentMonthYear.includes(targetYear)) {
                    cy.get(locators.nextButton).click()
                    selectMonthYear()
                }
            })
        })
    }
    selectMonthYear()

    // Select the target date
    cy.fixture('testData.json').then((testData) => {
        const locators = testData.locators
        const formattedDate = `${targetYear}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`
        const dateCellSelector = locators.dateCell.replace("''", `'${formattedDate}'`)
        cy.get(dateCellSelector).click()
    })
})

Cypress.Commands.add('selectDriverAge', (driverAge) => {
    cy.fixture('testData.json').then((testData) => {
        const locators = testData.locators

        // Click the appropriate age group button based on driverAge
        if (driverAge >= 18 && driverAge <= 29) {
            cy.get(locators.ageButton18to29).click()
        } else if (driverAge >= 30 && driverAge <= 69) {
            cy.get(locators.ageButton30to69).click()
        } else if (driverAge >= 70) {
            cy.get(locators.ageButton70plus).click()
        }
    })
})

Cypress.Commands.add('selectInsurance', (insuranceType) => {
    cy.fixture('testData.json').then((testData) => {
        const locators = testData.locators

        if (insuranceType === 'Basic') {
            cy.get(locators.insuranceButton).contains('Continuar con la cobertura limitada').click()
        } else if (insuranceType === 'Premium') {
            cy.get(locators.insuranceButton).contains('Continuar con la cobertura premium').click()
        }
    })
})

Cypress.Commands.add('selectInsuranceTypeAndAssertCostDifference', (insuranceType, additionalCost) => {
    cy.fixture('testData.json').then((testData) => {
      const locators = testData.locators
      
      cy.get(locators.initialPrice).then(($price) => {
        const totalPriceText = $price.find('span').eq(1).text().trim()
        const totalPrice = parseFloat(totalPriceText.replace('€', '').replace(',', '.'))
        const expectedPrice = (totalPrice + additionalCost).toFixed(2).replace('.', ',') + ' €'
  
        cy.selectInsurance(insuranceType)
        cy.get(locators.finalPrice).should('contain', expectedPrice)
      })
    })
  })