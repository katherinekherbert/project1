


// Make square grid
const grid = document.querySelector('.grid')

//play button
const start = document.querySelector('.start')
//restart button
const restart = document.querySelector('.restart')

// Specify the width of the grid + placement of donQ (aka the shooter)
const width = 15
const cells = []

//starting specs
let play = false
let donQ = 217
let sword = 202
const giants = [0, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 21]

let giantDirection = 'right'
let giantMoveId
let bombMove

const left = document.querySelector('.move-left')
const right = document.querySelector('.move-right')
const shoot = document.querySelector('.shoot')

// points
const score = document.querySelector('#points')
let points = 0
let victory = 100
let killGiant = 50
let diffuseBomb = 25
// points.innerHTML = points




//SET UPPPPPPPPPPP
//overlay
// function on() {
//   document.getElementById('overlay').style.display = 'block'
// }

// function off() {
//   document.getElementById('overlay').style.display = 'none'
// }

// on()

//generate grid
for (let index = 0; index < width ** 2; index++) {
  //Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  //Number each cell by its index
  cell.innerHTML = index
  // Set width and height of cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}

//make DQ appear
cells[donQ].classList.add('donQ')
//make sword appear
cells[sword].classList.add('sword')








//DQ and sword movement L&R
document.addEventListener('keyup', (event) => {
  const key = event.key

  //move right
  if (key === 'd' && !(donQ % width === width - 1)) {
    cells[donQ].classList.remove('donQ')
    donQ += 1
    cells[donQ].classList.add('donQ')

    cells[sword].classList.remove('sword')
    sword += 1
    cells[sword].classList.add('sword')

    //move left
  } else if (key === 'a' && !(donQ % width === 0)) {
    cells[donQ].classList.remove('donQ')
    donQ -= 1
    cells[donQ].classList.add('donQ')

    cells[sword].classList.remove('sword')
    sword -= 1
    cells[sword].classList.add('sword')
  }
})



//FUNCTIONZZZ

// start game
start.addEventListener('click', () => {
  function startGame() {
    // document.querySelector('.start').disabled = true

    play = true
    // off()
    createGiant()
    throwSword()
    moveGiants()
    dropBomb()
    mediaQuery(mobile)
  }
  startGame()
})

function resetGame() {
  window.location.reload()
  // off()
}

function throwSword() {
  //up arrow key command + reappear if disappears on top 
  document.addEventListener('keyup', (event) => {
    const key = event.key
    const swordId = setInterval(() => {
      if (key === 'w' && sword < width) {
        cells[sword].classList.remove('sword')
        clearInterval(swordId)
        sword = (donQ - width)
        cells[sword].classList.add('sword')
      } else if (key === 'w' && sword > width - 1) {
        cells[sword].classList.remove('sword')
        //MAKE IT GO STRAIGHT
        sword -= width
        cells[sword].classList.add('sword')
      }
    }, 100)
  })
}





//if sword hits giant 
const swordHit = setInterval(() => {
  for (let i = 0; i < giants.length; i++) {
    if (cells[giants[i]].classList.contains('sword')) {
      points += killGiant
      score.innerHTML = points

      const currentCell = cells[sword]

      cells[sword].classList.remove('sword')
      cells[sword].classList.remove('giant')

      cells[sword].classList.add('explosion')
      //length of explosion
      setTimeout(() => {
        currentCell.classList.remove('explosion')
      }, 250)

      giants.splice(i, 1)

    }
  }
}, 100)

//GIANTS
//create giant 
function createGiant() {
  giants.forEach(giant => cells[giant].classList.add('giant'))
}

// move giants 
function moveGiants() {
  const giantMoveId = setInterval(() => {
    //moving left 
    if (giantDirection === 'left') {

      if (giants[0] % width === 0) {
        giantDirection = 'right'

        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          giants[i] += width
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }


      } else {
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          giants[i] -= 1
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }
      }

      //moving right 
    } else if (giantDirection === 'right') {

      if (giants[giants.length - 1] % width === width - 1) {
        giantDirection = 'left'

        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          giants[i] += width
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }

      } else {
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          giants[i] += 1
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }
      }
    }

    //game over scenarios 

    // if giant hits DQ
    for (let i = 0; i <= giants.length - 1; i++) {
      if (cells[donQ].classList.contains('giant', 'donQ')) {
        cells[giants[i]].classList.remove('donQ')

        clearInterval(giantMoveId)
        clearInterval(swordHit)

        alert('Your best was not enough: Don Quixote has been clobbered by the giants')
        window.location.reload()
        break
      }
    }

    //if all giants gone 
    if (giants.length === 0) {
      points += victory
      score.innerHTML = points
      clearInterval(bombMove)
      clearInterval(giantMoveId)

      alert('You did it! You helped Don Quixote defeat the giants. Thank you for your service')
      window.location.reload()

      console.log('why tf are you not reloading')

      //gameOver()

    }
  }, 300)
}

// drop bomb
function dropBomb() {
  const randomGiant = Math.floor(Math.random() * giants.length)
  let bombPosition = giants[randomGiant]

  const bombMove = setInterval(() => {

    // if bomb hits sword
    if (cells[bombPosition].classList.contains('sword')) {
      points += diffuseBomb
      score.innerHTML = points

      clearInterval(bombMove)

      cells[bombPosition].classList.remove('bomb')
      cells[bombPosition].classList.add('explosion')

      setTimeout(() => {
        cells[bombPosition].classList.remove('explosion')
      }, 100)

      dropBomb()

      //if bomb hits DQ
    } else if (cells[bombPosition].classList.contains('donQ')) {

      cells[bombPosition].classList.remove('bomb')
      cells[bombPosition].classList.remove('donQ')
      cells[bombPosition].classList.add('explosion')

      clearInterval(bombMove)
      clearInterval(giantMoveId)

      alert('Don Quixote has been attacked by a vicious sheep! You lose')
      window.location.reload()

      //gameOver()


      //if bomb hits ground
    } else if (giants.length > 0 && bombPosition >= 210 && bombPosition <= 224) {

      cells[bombPosition].classList.remove('bomb')
      cells[bombPosition].classList.add('explosion')

      setTimeout(() => {
        cells[bombPosition].classList.remove('explosion')
      }, 90)

      clearInterval(bombMove)

      dropBomb()


      //regular bomb movements
    } else {
      cells[bombPosition].classList.remove('bomb')
      bombPosition += width
      cells[bombPosition].classList.add('bomb')

    }
  }, 300)

}


// media queries
const mobile = window.matchMedia('(max-width: 450px)')

function mediaQuery(mobile) {
  if (mobile.matches) {
    left.addEventListener('click', () => {
      if (!(donQ % width === 0)) {
        cells[donQ].classList.remove('donQ')
        donQ -= 1
        cells[donQ].classList.add('donQ')
    
        cells[sword].classList.remove('sword')
        sword -= 1
        cells[sword].classList.add('sword')
      }
    })
    
    right.addEventListener('click', () => {
      if (!(donQ % width === width - 1)) {
        cells[donQ].classList.remove('donQ')
        donQ += 1
        cells[donQ].classList.add('donQ')
    
        cells[sword].classList.remove('sword')
        sword += 1
        cells[sword].classList.add('sword')
      }
    })
    
    shoot.addEventListener('click', () => {
      const swordId = setInterval(() => {
        if (sword < width) {
          cells[sword].classList.remove('sword')
          clearInterval(swordId)
          sword = (donQ - width)
          cells[sword].classList.add('sword')
        } else if (sword > width - 1) {
          cells[sword].classList.remove('sword')
          //MAKE IT GO STRAIGHT
          sword -= width
          cells[sword].classList.add('sword')
        }
      }, 100)
    })
  }
}

mobile.addListener(mediaQuery)







