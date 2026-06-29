Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "practice@expandtesting.com"
    And I enter password "SuperSecretPassword!"
    And I click the login button
    Then I should be logged in successfully

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter username "invalid@example.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message
