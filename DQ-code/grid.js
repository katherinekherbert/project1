
// Make square grid
const grid = document.querySelector('.grid')

// Specify the width of the grid + placement of donQ
const width = 10
const cells = []

//starting specs
let play = false
let donQ = 94
let sword = 84

const giants = [0, 1, 2, 3]
let giantDirection = 'right'
// let giantMoveId

// points
// const points = document.getElementById('points')
// let points = 0


//SET UPPPPPPPPPPP
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
  if (key === 'ArrowRight' && !(donQ % width === width - 1)) {
    cells[donQ].classList.remove('donQ')
    donQ += 1
    cells[donQ].classList.add('donQ')

    cells[sword].classList.remove('sword')
    sword += 1
    cells[sword].classList.add('sword')

    //move left
  } else if (key === 'ArrowLeft' && !(donQ % width === 0)) {
    cells[donQ].classList.remove('donQ')
    donQ -= 1
    cells[donQ].classList.add('donQ')

    cells[sword].classList.remove('sword')
    sword -= 1
    cells[sword].classList.add('sword')
    // call throwSword function
  }
})

//FUNCTIONZZZZZZZZZZZZ
function startGame() {
  play = true
  createGiant()
  throwSword()
  moveGiants()
}

startGame()


function throwSword() {
  document.addEventListener('keyup', (event) => {
    const key = event.key
    const swordId = setInterval(() => {
      if (key === 'ArrowUp' && sword < width) {
        cells[sword].classList.remove('sword')
        clearInterval(swordId)
        sword = (donQ - 10)
        cells[sword].classList.add('sword')
      } else if (key === 'ArrowUp' && sword > width) {
        cells[sword].classList.remove('sword')
        //MAKE IT STAY IN STRAIGHT LINE 
        sword -= 10
        cells[sword].classList.add('sword')
      }
    }, 100)
  })
  // if (cells[giants].classList.contains('giant', 'sword')) {
  //   cells[sword].classList.remove('sword')
  //   cells[sword].classList.remove('giant')
  //   cells[sword].classList.add('explosion')
  //   setTimeout(() => cells[sword].classList.remove('explosion'), 250)
  // }
}



//GIANTS
//create giant 
function createGiant() {
  giants.forEach(giant => cells[giant].classList.add('giant'))
}

// move giants 
function moveGiants() {
  setInterval(() => {
    
    //moving left 
    if (giantDirection === 'left') {
      console.log('stage 1')

      if (giants[0] % width === 0) {
        giantDirection = 'right'

        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          giants[i] += 10
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }

        console.log('stage 2')

      } else {
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          console.log(giants[i])
          giants[i] -= 1
          console.log(giants[i])
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }
        console.log('stage 3')
      }

      //moving right 
    } else if (giantDirection === 'right') {
      console.log('stage 4')

      if (giants[giants.length - 1] % width === width - 1 ) {        
        giantDirection = 'left'

        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.remove('giant')
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          giants[i] += 10
        }
        for (let i = 0; i <= giants.length - 1; i++) {
          cells[giants[i]].classList.add('giant')
        }
        console.log('stage 7')

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
        console.log('stage 6')
      }
    }
  }, 100)
}

// function dropBomb() {
//   Math.floor etc to pick a random alien 
//   if collide with player -> you loseeee
//   if collide with border -> disappear 
// } TIME INTERVAaL

// function gameOver() {
//   alert you lose (inner HTML)
//   buttonnnn to restartLevel
//   clear everything & reload game board
 // STOPS IF: 1 hits ground 2 hits DQ 3 hit by arrow
      // if hits ground
      //  else if (!(giants + width >= width ** 2)) {
      //   clearInterval(giantMoveId)
      //   // console.log('Giants have breached the surface')
      //   //gameOver()
      //   //if its DQ

      //   //if it hits DQ
      // } else if (cells[giants].classList.contains('giant', 'donQ')) {
      //   clearInterval(giantMoveId)
      //   //gameOver()
      //   console.log('DQ has been clobbered')
      // }
      //       }
// }

// function youWin() {
// alert you win 
// button for restart/next level
//   clear everything & (re)load game board
// }