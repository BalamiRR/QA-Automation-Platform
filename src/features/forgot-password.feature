Feature: Forgot Password Recovery

  Scenario: Submit password recovery request with valid email
    Given I am on the forgot password page
    When I enter email "practice@expandtesting.com" in the password recovery form
    And I submit the password recovery form
    Then I should see a success message for password recovery

  Scenario: Submit password recovery request with unregistered email
    Given I am on the forgot password page
    When I enter email "unregistered@example.com" in the password recovery form
    And I submit the password recovery form
    Then I should see a success message for password recovery
