# Space Invaders a la Don Quixote
 
 <h4>This project involved creating an interactive grid-based game using only HTML, CSS and JavaScript. I chose to replicate the classic Space Invaders, but with a Don Quixote theme. The user can play the game on both the computer and their mobile device, with the only change being the game controls used.</h4>
 
 There are three main content sections:
  1. The game itself + rules on how to play
  2. Information that puts 'Don Quixote' in context
  3. Extra information + credits
  
  <em>Game section</em>
  The game board is a 15x15 grid powered by JavaScript
 
 <h3>Basic summary:</h3>
    <li>Before getting in too deep, I declared several variables to control the size of the grid, the movement of the player (Don Quixote), the weapon (a sword), the attackers (giants) and their bombs (in this case, sheep)</li>
    <li>I then generated the grid using a for loop, generated Don Quixote and his sword in a function and generated their movements using an eventListener and if statement.
    <li>I added an overlay over the gameboard along with a start button for mainly aesthetic purposes</li>
    <li>Then, I moved on to the functions. All functions are called in the startGame() function, which is within an eventListener that waits for the 'Start Game' button to be clicked</li>
    <li>To adapt this game to cellphones, I added a media query which replaced the keyboard game controls with three buttons that appear under the gameboard</li>


<h3>Detailed summary</h3>
<li>offInitialOverlay(): a simple function that makes the overlay disappear after the 'Start' button is pressed</li>
<li>dQySwordAppear(): completed using .classList.add</li>
<li>createGiant(): completed using a forEach statement</li>
<li>throwSword(): completed using an eventListener that listens for WSAD commands, an if statement and a timed interval</li>
<li>moveGiants(): completed within a function that holds a timed interval, if statements, for loops and mathematical logic to control their movements within the grid</li>
<li>dropBomb(): using Math logic assigned to a random giant, this function was completed using a timed interval and an if statement with four conditions: if the bomb hits the sword (it will disappear), if the bomb hits Don Quixote (the game ends), if the bomb hits the ground (it will disappear) and the regular bomb movement. The bombs in this case are sheep.</li>
<li>mediaQuery(mobile): using a function, eventListeners and if statements, I added game control buttons for mobile users</li>

<h3>Consequences</h3>
<li>If the sword kills a giant, the giant disappears from the grid based on mathematical logic, a for loop, an if statement, splice and a timed interval.</li>
<li>A for loop and an if statement were employed to determine if a giant kills Don Quixote and, if it is true, the giant movement interval as well as the sword movement intervals are cleared, an alert pops up telling the player that they have lost, and the page reloads>
<li>An if statement determines if Don Quixote has defeated all the giants and, when that is true, the intervals are cleared, an alert pops up and the page reloads</li>

