Feature: Dynamic pagination table verification
  As a test automation engineer
  I want to validate the paginated table page on the practice site
  So that pagination controls and row content are verified correctly

  Scenario: Verify the dynamic pagination table headers and first page row count
    Given I am on the dynamic pagination table page
    Then the dynamic pagination table should display the correct headers
    And the dynamic pagination table should contain at least 3 rows on the current page
    And I close the pagination browser

  Scenario: Verify pagination can move to page 2
    Given I am on the dynamic pagination table page
    When I move to page 2 of the pagination controls
    Then page 2 should be active in the pagination controls
    And the dynamic pagination table should contain at least 3 rows on the current page
    And I close the pagination browser

  Scenario: Verify the next page navigation is available
    Given I am on the dynamic pagination table page
    When I move to the next table page
    Then the next page button should be visible
    And I close the pagination browser
