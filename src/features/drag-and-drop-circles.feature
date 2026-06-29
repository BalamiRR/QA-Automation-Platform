Feature: Drag and Drop Circles page verification
  As a test automation engineer
  I want to validate the drag and drop circles demo page
  So that draggable circle selection and target behavior are covered

  Scenario: Verify the drag and drop circles page loads successfully
    Given I am on the drag and drop circles page
    Then the drag and drop circles page should have the correct header
    And I should see three draggable circle options
    And I close the drag circles browser

  Scenario: Verify dragging the red circle adds it to the target area
    Given I am on the drag and drop circles page
    When I drag the red circle into the target area
    Then the target area should contain the red circle
    And I close the drag circles browser

  Scenario: Verify dragging the green circle adds it to the target area
    Given I am on the drag and drop circles page
    When I drag the green circle into the target area
    Then the target area should contain the green circle
    And I close the drag circles browser
