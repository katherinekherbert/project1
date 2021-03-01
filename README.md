# Space Invaders a la Don Quixote
 
 ### Overview
* Don Quixote vs. the Windmills is my very first front-end development project! I was tasked with developing a grid-based game rendered in the browser using only vanilla JavaScript, HTML and CSS. 
* I chose to put a spin on the arcade classic Space Invaders, rebranding it with a theme based on the novel *Don Quixote*, a fundamental work of Western literature. The goal is to help Don Quixote defeat the giants, while simultaneously avoiding being mauled by the sheep they launch at you.
<p>In addition to creating the game, I was also to ensure to include sections that offer additional context about *Don Quixote* as well as crediting the sources and people who helped me finish this project. I am a trained librarian with a degree in history, and I wanted this project to reflect my interests and the type of work I hope to do in the future.

Play the game <a href="https://kkherbert.github.io/project1/" target="_blank">here</a>!
  
 ## The Brief
  * Render a game in the browser
  * Design logic for defeating the wave of attacking giants and displaying the score
  * Deploy the game online
  * Use JavaScript for DOM manipulation
  * Use semantic markup best practices for HTML and CSS
  
## Technologies used
* HTML5
* CSS3
* JavsScript (ES6)
* Google Fonts
* Flaticon graphics

## The Approach
### The Grid
The game board is a 15x15 grid powered by JavaScript, including DOM manipulation using HTML divs. Cells were generated using a for loop and then being appended as children of the grid.
![grid](https://user-images.githubusercontent.com/73107893/109470512-ce895f80-7a6f-11eb-84d6-24edd42819de.png)

### Player and Weapon
The shooter in this game is Don Quixote, and his weapon is his sword. I put them on the grid through DOM manipulation, and organized them neatly within the function dQySwordAppear() (the y meaning 'and' in Spanish).
![DQ variable + appear](https://user-images.githubusercontent.com/73107893/109470544-dba64e80-7a6f-11eb-9a92-70deee726569.png)


To control the movements of Don Quixote and the horizontal movement of the sword when played on the computer, I utilized an event listener that checks for a keyup event to determine whether to move the duo to the left or the right, which is accomplished through an if statement with logic to determine the limits of the board. 
![DQ move L + R computer](https://user-images.githubusercontent.com/73107893/109470565-e3fe8980-7a6f-11eb-98fc-017f9c63b6df.png)


The vertical sword movement is controlled by the function throwSword. There are two sections that account for two eventualities: the sword being thrown and if the sword makes contact with a giant. The sword is thrown utilizing an event listener that listens for a keyup event, all controlled by a time interval of 100 miliseconds. After being shot, the sword will travel up the board in a straight line following the index of Don Quixote.  The rationale behind this departure from the classic Space Invaders game is that Don Quixote is a true knight engaging in hand-to-hand combat with these enemies and, as such, the sword would not go flying in a direction contrary to his position. 
![sword movement up](https://user-images.githubusercontent.com/73107893/109470626-faa4e080-7a6f-11eb-9634-a7789b8059c6.png)

The second component of the throwSword function is the consequence of the sword destroying a giant, which is that the player gets points, and the giant disappears after being exploded. This was completed using a for loop to determine the giant position, and and if statement to determine whether the sword and a giant are in the same cell. If the condition is true, the payer is awarded points (which updates the scoreboard below the game), the existing graphics are replaced by one of a explosion (which disappears based on a timed interval), and the giants array is spliced so that the giant is fully removed from the game. All of this takes place within a timed interval.
![sword hits giant](https://user-images.githubusercontent.com/73107893/109470650-04c6df00-7a70-11eb-8a6c-0a08402b3827.png)

In order to account for those who might play this game on a mobile device, I utilized a media query to alter the game controls. To do this, I disabled the keyboard controls (while maintaing all other logic employed) and used DOM manipulation and event listeners checking for a click to create three new buttons to account for the movements of Don Quixote and his sword: move left, move right and shoot.
![MQ buttons](https://user-images.githubusercontent.com/73107893/109470672-0db7b080-7a70-11eb-9ec4-03e61cb327f8.png)


### Attacker
The chief threat of this game are the giants. This component is key because the outcome of the game depends on them: if Don Quixote destroys all the giants he wins but, if he is hit by a giant, the game is over.

The giants were created with the function of createGiants, which created one giant for each index in the array using the forEach method.
![create giant](https://user-images.githubusercontent.com/73107893/109470739-1e682680-7a70-11eb-9fe2-f4be124c2ef6.png)

The tricky part of the giant movement was that they had to move in formation within the boundaries of the grid without wrapping around. This was completed through a function that including a timed interval to dictate the speed of the giant movement, if statements to check in what direction the giants are currently moving, if statements to determine the boundary of the grid, and for loops to move the giants from index to index. 
![giant move](https://user-images.githubusercontent.com/73107893/109470773-26c06180-7a70-11eb-8bc8-62ee8094144a.png)


Next, I had to plan for different scenarios. To determine if a giant had clobbered Don Quixote, I used a for loop to check the giant position, and an if statement to check if any cells contained both Don Quixote and a giant. If that condition is true, the graphics are replaced by one of a skull, the timed interval controlling the giants movement is stopped, the timed interval controlling sword movement is stopped, an alert pops up to inform the player that they have lost, and the page refreshes
![GIANT HITS DQ](https://user-images.githubusercontent.com/73107893/109470796-2f189c80-7a70-11eb-86e2-9f04c037cb4f.png)

On the other hand, if Don Quixote destroys all the giants, the player wins. To determine that, I used an if statement to check the length of the giant array and, if it is 0, I utilized DOM logic to update the points, cleared the giants movement and sword movement intervals, created a different alert to inform the player that they won and had the page reload.

### Attacker's weapon
Sheep are the giants weapon of choice (it makes more sense if you've read the book), and they are launched from a random giant and try to destroy Don Quixote at the bottom of the board in a timed interval of 300. If the sheep hits the ground or is impaled by the sword, it explodes, is removed and another sheep falls. If, on the other hand, it makes contact with Don Quixote, the game is over. All of this takes place within the dropBomb function.

The sheep are created using DOM manipulation and logic employing the Math.floor(Math.random()) method.
![create sheep](https://user-images.githubusercontent.com/73107893/109470852-3f307c00-7a70-11eb-9a53-5a31be30bff7.png)

The movement and livelihood of a sheep is controlled within a timed interval and by an if statement. The first eventuality is that the sheep is impaled by a sword, which would mean the player gets points, the sheep explodes and another one falls. This is completed by checking if a cell contains both the sheep and the sword, DOM manipulation to update the points, the clearing of the timed sheep movement interval and the calling of the dropBomb function so that another sheep immediately falls
![SHEEP HIT SWORD](https://user-images.githubusercontent.com/73107893/109470875-45bef380-7a70-11eb-9a9c-42e803e90cc4.png)

The second eventuality is if the sheep mauls Don Quixote, meaning the game is over. This is nestled in the if statement, and uses similar logic to the other consequences of the game: the checking of the contents of the cells, the removal of the images, the clearing of intervals, an alert and the reloading of the page
![sheep hits DQ](https://user-images.githubusercontent.com/73107893/109470902-4e172e80-7a70-11eb-90c7-fef2a1a46215.png)

The third eventuality is if the sheep hits the ground without making contact with either the sword or Don Quixote. Using logic to determine the boundary of the gameboard, I once again utilized DOM manipulation to change the image of the sheep to one of an explosion (with a timed interval to remove said image), the clearing of the sheep movement interval and the calling of the dropBomb function so that another sheep will fall
![SHEEP GROUND](https://user-images.githubusercontent.com/73107893/109470929-55d6d300-7a70-11eb-923f-70071ace7d01.png)

If none of those conditions are true, the else statement dictates the sheeps movement towards the ground
![sheep moving](https://user-images.githubusercontent.com/73107893/109470956-5e2f0e00-7a70-11eb-997d-0e75822207ff.png)


### Points System
Points are updated using variables and DOM manipulation. For each eventuality, a certain number of points is awarded.
![POINTS](https://user-images.githubusercontent.com/73107893/109470992-6b4bfd00-7a70-11eb-8f2f-2a9f02386a8a.png)

### Gameboard Overlay
For aesthetic purposes, I employed an overlay to hide the gameboard until the start button is clicked
![overlay](https://user-images.githubusercontent.com/73107893/109471017-743cce80-7a70-11eb-96a7-0ebdf70f7e63.png)

### And how to begin?
To make things tidy, I created a function called startGame nestled within an event listener checking to see if the 'Start Game' button has been clicked.
![start](https://user-images.githubusercontent.com/73107893/109471050-7ef76380-7a70-11eb-8445-acdcbd4baf0d.png)


## Challenges
* This was my first project, my first time to put all the knowledge I had learned about HTML, CSS and JavaScript to work. My approach wasn't always perfect, but through trial and error (and help from my instructors) I was able to create an MVP (and then some).
* Making the giants move in formation was, without a doubt, the most difficult technical aspect to me. It reached the point where I was employing the throw-spaghetti-at-the-wall-and-see-what-sticks method which, after several hours, bore fruit!
* The graphic design. I have never been much of a design person and do not love the styling of my page (with the exception of the gameboard). I am eternally grateful for websites that generate color palettes for you, but truly hope to develop these skills as time goes on. 

## Victories
* I am proud of the extra features I added, such as the media query and the overlay, and of the extra content I developed. For a Don Quixote fan, it is a silly diversion. And for the rest, well, the graphics are fun and it's a great opportunity to learn a little about one of the most important books of all time
* Pre-planning. By pre-planning the code and my days, I was able to be as efficient as possible and avoid falling into the pit of despair.


## Potential future features
* Instead of the cheap white pop-up alerts that come up when the game is over, I would like to replicate the initial overlay.
* Reformatting the content boxes in a grid format. I initially only planned to create the game and a "how to play" box but, upon realizing I had a few spare hours, decided to develop the page's content (the explanation of who Don Quixote is, the history of the book, additional links and credits). Since these extra items were not in the intial plan, I continued the usage of div's and section's to manipulate the Flexbox. In other words, to create a planned city and not one that meanders in different directions as they are built.
* The addition of increasingly difficult levels. Perhaps next time the giants can throw wineskins and fists of Basque men in addition to sheep...
* Giving more coherency to the class, id, function and timed intervals. In general they have a flow but, now that everything is said and done, it could be more streamlined</p>
* On the mobile version, the logic behind the 'move left' and 'move right' buttons can create a situation in which an overly excited player taps the button twice, causing the screen to zoom in. It would be helpful to make it so that Don Quixote continues moving in the indicated direction until he reaches the respective boundary</p>

## Lessons learned
* Planning. Is. Everything. from top to bottom.
* Utilizing colored pens and highlighters is both function and fun.
* Console logs and thick fuschia borders make things a lot easier to debug
* Don't look at the project before bed because one thousand little things will come to mind and it will disrupt your sleep schedule

Intrigued? Play <a href="https://kkherbert.github.io/project1/" target="_blank">now</a>!
