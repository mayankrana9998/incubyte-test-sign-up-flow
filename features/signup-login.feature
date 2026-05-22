Feature: ParaBank account sign-up and login
  As a new user
  I want to register and sign in
  So that I can access my account and see post-login account amount

  Scenario: Register, sign in, and log account balance
    Given I open the ParaBank home page
    When I register a brand new ParaBank user
    And I sign in with the created user
    Then I should see the Accounts Overview page
    And I log the displayed account amount
