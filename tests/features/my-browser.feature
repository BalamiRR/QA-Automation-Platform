Feature: My browser information page
  As a test automation engineer
  I want to verify the browser information page on the practice site
  So that the page loads correctly and browser details are displayed

  Scenario: Verify my browser page loads successfully
    Given I am on the my browser page
    Then I should see the browser information button
    And I close the my browser page browser

  Scenario: Verify browser information is displayed after request
    Given I am on the my browser page
    When I request browser information
    Then browser information should be visible
    And I close the my browser page browser

  Scenario: Verify the displayed user agent contains HeadlessChrome
    Given I am on the my browser page
    When I request browser information
    Then the browser user agent should contain "HeadlessChrome"
    And I close the my browser page browser
