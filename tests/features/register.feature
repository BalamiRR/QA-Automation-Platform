Feature: User Registration

  Scenario: Successful user registration
    Given I am on the registration page
    When I fill in the registration form with valid details
    And I submit the registration form
    Then I should see a success message


