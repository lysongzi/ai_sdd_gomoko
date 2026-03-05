## ADDED Requirements

### Requirement: Render Board
The interface SHALL render a grid representing the game board, scaling to fit the viewport.

#### Scenario: Render 20x20 Board
- **WHEN** the game starts with a 20x20 board
- **THEN** a grid with 20 horizontal and 20 vertical lines is displayed

### Requirement: Cyberpunk Styling
The interface SHALL use a Cyberpunk aesthetic with neon colors and dark backgrounds.

#### Scenario: Theme Application
- **WHEN** the application loads
- **THEN** the background is dark (e.g., #0f0f1f)
- **AND** grid lines and pieces use neon colors (e.g., cyan #00f0ff, magenta #ff00ff)

### Requirement: Turn Indicator
The interface SHALL display whose turn it is.

#### Scenario: Show Current Player
- **WHEN** it is Black's turn
- **THEN** a visual indicator clearly shows "Black's Turn"

### Requirement: Game Over Notification
The interface SHALL display a notification when the game ends.

#### Scenario: Win Notification
- **WHEN** a player wins
- **THEN** a modal or overlay displays "Winner: [Color]"

#### Scenario: Draw Notification
- **WHEN** the game ends in a draw
- **THEN** a modal or overlay displays "Draw"
