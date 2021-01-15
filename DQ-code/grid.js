
// Make square grid
const grid = document.querySelector('.grid')

// Specify the width of the grid + placement of donQ
const width = 10
const cells = []

//starting specs
let play = false
let donQ = 94
let sword = 84

let giants = [0, 1, 2, 3]
let giantDirection = 'right'
let giantMoveId
// let giantArray = giants.slice()


//points
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
  // Set width and heigh of cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}


//make DQ and sword appear
cells[donQ].classList.remove('donQ')
donQ += 1
cells[donQ].classList.add('donQ')
//make sword appear
cells[sword].classList.remove('sword')
sword += 1
cells[sword].classList.add('sword')


//DQ and sword movement 
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
  setInterval(moveGiants(), 1000)
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
        //MAKE IT APPEAR IMMEDIATELY AFTER CLICKING UP
        sword -= 10
        cells[sword].classList.add('sword')
      }
    }, 1000)
  })
}

//GIANTS
//create giant 
function createGiant() {
  giants.forEach(giant => cells[giant].classList.add('giant'))
}

// move giants 
function moveGiants() {
  console.log(giants)

  giants.forEach(giant => {

    //moving left 
    if (giantDirection === 'left') {
      if (giants[0] === width % 0) {
        giantDirection = 'right'
      } else {
        cells[giant].classList.remove('giant')
        giant -= 1
        cells[giant].classList.add('giant')
        //right here
        console.log('hello')
      }

      //moving right 
    } else if (giantDirection === 'right') {
      if ((giants.length - 1) === width) {
        giantDirection = 'left'
      } else {
        cells[giant].classList.remove('giant')
        giant += 1
        cells[giant].classList.add('giant')
        //right here
        console.log('hello')
      }
      //if hits ground
      // } else if (!(giants + width >= width ** 2)) {
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
    }
  })
}

console.log(giants)





// function dropBomb() {
//   Math.floor etc to pick a random alien 
//   if collide with player -> you loseeee
//   if collide with border -> disappear 
// } TIME INTERVAaL

// function restartLevel() {
//   alert you lose 
//   buttonnnn to restartLevel
//   clear everything
// }

// function youWin() {
// alert you win 
// button for restart/next level
//   clear everything
// }