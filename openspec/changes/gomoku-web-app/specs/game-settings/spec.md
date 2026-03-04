## ADDED Requirements

### Requirement: Configure Board Size
The system SHALL allow the user to input a board size between 20 and 50.

#### Scenario: Valid Size Input
- **WHEN** user enters 30
- **THEN** the setting is accepted

#### Scenario: Invalid Size Input (Too Small)
- **WHEN** user enters 10
- **THEN** the system shows an error message "Size must be between 20 and 50"

#### Scenario: Invalid Size Input (Too Large)
- **WHEN** user enters 60
- **THEN** the system shows an error message "Size must be between 20 and 50"

### Requirement: Configure Player Role
The system SHALL allow the user to choose to play as Black (First) or White (Second).

#### Scenario: Choose Black
- **WHEN** user selects "Black"
- **THEN** the user is assigned the first move

#### Scenario: Choose White
- **WHEN** user selects "White"
- **THEN** the computer (or second player) takes the first move
