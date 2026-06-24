Feature: Dynamic table verification
  As a test automation engineer
  I want to verify the dynamic table page content on the practice site
  So that table headers, row count, and browser performance data are validated

  Scenario: Verify dynamic table headers and row count
    Given I am on the dynamic table page
    Then I should see the dynamic table headers
    And the dynamic table should contain at least 4 rows

  Scenario: Verify expected browser rows exist in the dynamic table
    Given I am on the dynamic table page
    Then I should see a row for "Firefox"
    And I should see a row for "Chrome"
    And I should see a row for "Internet Explorer"
    And I should see a row for "System"
    And I close the browser

  Scenario: Verify Firefox row has valid performance values
    Given I am on the dynamic table page
    Then I should see a row for "Firefox"
    And the row for "Firefox" should have 5 columns
    And the row for "Firefox" should have valid performance values
    And I close the browser
