Feature: OTP Login
  As a user of the practice website
  I want to login using OTP (One-Time Password)
  So that I can access the system securely

  Scenario: Send OTP to valid email
    Given I am on the OTP login page
    When I enter email "practice@expandtesting.com" for OTP login
    And I click the send OTP button
    Then I should see the OTP sent message for "practice@expandtesting.com"
    And the OTP input field should be visible
    And the verify OTP button should be visible

  Scenario: Verify OTP with correct code
    Given I am on the OTP login page
    When I enter email "practice@expandtesting.com" for OTP login
    And I click the send OTP button
    And I enter OTP code "214365"
    And I click the verify OTP button
    Then I should be logged in successfully via OTP

  Scenario: Verify OTP with incorrect code
    Given I am on the OTP login page
    When I enter email "practice@expandtesting.com" for OTP login
    And I click the send OTP button
    And I enter OTP code "123456"
    And I click the verify OTP button
    Then I should see an OTP error message
