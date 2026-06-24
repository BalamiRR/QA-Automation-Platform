Feature: Locators page verification
  As a test automation engineer
  I want to validate locator strategies on the locators practice page
  So that multiple locator-based interactions are covered

  Scenario: Verify the locators page loads successfully
    Given I am on the locators page
    Then I should see the locators page heading
    And the status message should include "All systems operational"
    And I close the locators browser

  Scenario: Verify selecting a country using the country dropdown
    Given I am on the locators page
    When I select "France" from the country dropdown
    Then the selected country should be "France"
    And I close the locators browser

  Scenario: Verify the newsletter email field works by ID locator
    Given I am on the locators page
    When I enter "test@example.com" into the newsletter email field
    Then the newsletter email field should contain "test@example.com"
    And I close the locators browser

  Scenario: Verify the search input works by placeholder locator
    Given I am on the locators page
    When I search for "Playwright" using the search box
    Then the search input should display "Playwright"
    And I close the locators browser

  Scenario: Verify the reload button is visible by title locator
    Given I am on the locators page
    When I click the reload button
    Then the reload button should be visible
    And I close the locators browser

  Scenario: Verify the Expand Testing link uses the expected href
    Given I am on the locators page
    Then the Expand Testing link should point to a valid href
    And I close the locators browser
