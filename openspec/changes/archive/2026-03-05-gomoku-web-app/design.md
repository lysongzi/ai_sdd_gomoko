## Context

The goal is to build a web-based Gomoku application with specific customization options and a Cyberpunk aesthetic. The application needs to be responsive and handle board sizes up to 50x50.

## Goals / Non-Goals

**Goals:**
- Create a functional Gomoku game loop (move, win detection, draw).
- Implement a configurable board size (20x20 to 50x50).
- Implement player turn selection (Black/White).
- Apply a consistent Cyberpunk visual theme.
- Ensure the application is performant enough for the maximum board size.

**Non-Goals:**
- Online multiplayer (server-side game state).
- Advanced AI (simple local PvP or basic random moves if needed).
- Mobile-native app (web only).

## Decisions

### 1. Technology Stack
- **Framework**: React with Vite. React provides a robust component model for the UI, and Vite offers a fast development experience.
- **Language**: TypeScript for type safety, especially for the board state and game logic.

### 2. State Management
- **Approach**: React `useState` and `useReducer`.
- **Rationale**: The game state is contained within a single view. A complex global state manager (Redux, etc.) is unnecessary overhead. `useReducer` is ideal for handling game actions (PLACE_PIECE, RESET_GAME, etc.).

### 3. Board Representation
- **Data Structure**: A 2D array ( `number[][]` or `Cell[][]` ).
- **Values**: 0 for empty, 1 for Black, 2 for White.
- **Rationale**: Simple to map to the UI and efficient for win detection algorithms.

### 4. Win Detection Algorithm
- **Algorithm**: Check all 4 directions (horizontal, vertical, diagonal, anti-diagonal) from the last placed piece.
- **Rationale**: More efficient than scanning the entire board on every move. Complexity is O(1) relative to board size (constant check radius/length), though O(N) if we scan full lines, but checking just the vicinity of the last move is sufficient.

### 5. Rendering Strategy
- **Approach**: HTML `div` elements for the grid and cells.
- **Performance Consideration**: A 50x50 board means 2500 elements. React can handle this, but we should use `React.memo` for individual Cell components to prevent re-rendering the entire board on every move.
- **Styling**: CSS Modules or standard CSS with CSS variables for the Cyberpunk theme (neon glows, dark mode).

## Risks / Trade-offs

### Risk: Rendering Performance
- **Risk**: 2500 DOM nodes (50x50) might cause layout thrashing or slow updates on lower-end devices.
- **Mitigation**:
  - Use `React.memo` to only re-render the changed cell.
  - If DOM performance is poor, fallback to HTML5 `<canvas>` for the board rendering, though this complicates accessibility and styling. We will start with DOM.

### Risk: Win Detection Logic Bugs
- **Risk**: Edge cases (board boundaries) might cause crashes or missed wins.
- **Mitigation**: Comprehensive unit tests for the win detection logic, covering all boundary conditions and directions.
