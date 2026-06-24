Feature: Radio buttons page verification
  As a test automation engineer
  I want to validate the radio buttons practice page
  So that radio input defaults and selection behavior are covered

  Scenario: Verify default selections on the radio buttons page
    Given I am on the radio buttons page
    Then the default selected color should be "blue"
    And the default selected sport should be "tennis"
    And I close the radio buttons browser

  Scenario: Verify selecting the red color updates the selection
    Given I am on the radio buttons page
    When I choose the color "red"
    Then the selected color should be "red"
    And I close the radio buttons browser

  Scenario: Verify selecting the basketball sport updates the selection
    Given I am on the radio buttons page
    When I choose the sport "basketball"
    Then the selected sport should be "basketball"
    And I close the radio buttons browser

  Scenario: Verify available color options are present
    Given I am on the radio buttons page
    Then I should see 5 color options
    And I close the radio buttons browser
