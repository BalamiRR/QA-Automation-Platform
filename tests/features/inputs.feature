Feature: Web inputs interaction
  As a user of the practice website
  I want to enter values into web inputs and view the displayed output

  Scenario: Display entered inputs
    Given I am on the inputs page
    When I enter number "42"
    And I enter text "Hello"
    And I enter the input password "P@ssw0rd"
    And I enter date "2026-04-13"
    And I click the display inputs button
    Then I should see the output number "42"
    And I should see the output text "Hello"
    And I should see the output password "P@ssw0rd"
    And I should see the output date "2026-04-13"

  Scenario: Clear input values removes outputs
    Given I am on the inputs page
    When I enter number "123"
    And I enter text "ClearTest"
    And I enter the input password "Secret!"
    And I enter date "2026-05-01"
    And I click the display inputs button
    And I click the clear inputs button
    Then the inputs should be cleared
    And there should be no input outputs visible
