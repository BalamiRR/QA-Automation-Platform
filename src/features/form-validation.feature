Feature: Form Validation page verification
  As a test automation engineer
  I want to validate the form validation demo page
  So that form input validation and submission behavior are verified

  Scenario: Verify the form validation page loads correctly
    Given I am on the form validation page
    Then the form validation page should display the correct heading
    And I close the form validation browser

  Scenario: Verify empty form submission shows validation errors
    Given I am on the form validation page
    When I click the register button
    Then a validation error should appear for the contact number
    And a validation error should appear for the pickup date
    And a validation error should appear for the payment method
    And I close the form validation browser

  Scenario: Verify entering contact name works correctly
    Given I am on the form validation page
    When I enter "John Doe" in the contact name field
    Then the contact name field should contain "John Doe"
    And I close the form validation browser

  Scenario: Verify selecting a payment method works correctly
    Given I am on the form validation page
    When I select "card" as the payment method
    Then the payment method should be set to "card"
    And I close the form validation browser

  Scenario: Verify filling out required form fields
    Given I am on the form validation page
    When I enter "Jane Smith" in the contact name field
    And I enter "012-3456789" in the contact number field
    And I select "2026-05-15" as the pickup date
    And I select "cashondelivery" as the payment method
    Then the contact name field should contain "Jane Smith"
    And the payment method should be set to "cashondelivery"
    And I close the form validation browser
