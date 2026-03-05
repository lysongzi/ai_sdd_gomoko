## ADDED Requirements

### Requirement: Initialize Game
The system SHALL initialize a new game with an empty board of the specified size.

#### Scenario: Start New Game
- **WHEN** a new game is started with size 20
- **THEN** an empty 20x20 grid is created
- **AND** the current turn is set to Black (first player)

### Requirement: Place Piece
The system SHALL allow placing a piece on an empty intersection and update the board state.

#### Scenario: Valid Move
- **WHEN** the current player selects an empty intersection
- **THEN** a piece of the current player's color is placed there
- **AND** the turn switches to the other player

#### Scenario: Invalid Move (Occupied)
- **WHEN** the current player selects an occupied intersection
- **THEN** the move is rejected
- **AND** the turn does not switch

### Requirement: Detect Win
The system SHALL detect when a player has formed a continuous line of exactly five stones horizontally, vertically, or diagonally.

#### Scenario: Horizontal Win
- **WHEN** a player places a stone that completes a horizontal line of 5 stones
- **THEN** the game state changes to "Win" for that player

#### Scenario: Vertical Win
- **WHEN** a player places a stone that completes a vertical line of 5 stones
- **THEN** the game state changes to "Win" for that player

#### Scenario: Diagonal Win
- **WHEN** a player places a stone that completes a diagonal line of 5 stones
- **THEN** the game state changes to "Win" for that player

### Requirement: Detect Draw
The system SHALL detect a draw if the board is full and no player has won.

#### Scenario: Board Full
- **WHEN** the last empty intersection is filled without creating a win condition
- **THEN** the game state changes to "Draw"
