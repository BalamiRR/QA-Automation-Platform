Feature: Drag and Drop page verification
  As a test automation engineer
  I want to validate the drag and drop demo page
  So that draggable boxes and swap behavior are covered

  Scenario: Verify the drag and drop page loads correctly
    Given I am on the drag and drop page
    Then the drag and drop page should have a visible header
    And I should see draggable boxes A and B
    And I close the drag page browser

  Scenario: Verify dragging box A onto box B swaps their positions
    Given I am on the drag and drop page
    When I drag box A onto box B
    Then box A and box B should swap places
    And I close the drag page browser

  Scenario: Verify dragging box B back onto box A restores original order
    Given I am on the drag and drop page
    When I drag box A onto box B
    And I drag box B back onto box A
    Then box A and box B should return to their original positions
    And I close the drag page browser
