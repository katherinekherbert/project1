
// Make square grid
const grid = document.querySelector('.grid')

// Specify the width of the grid + placement of donQ (aka the shooter)
const width = 10
const cells = []

//starting specs
let play = false
let donQ = 94
let sword = 84
const giants = [0, 1, 2, 3]
let giantDirection = 'right'
let giantMoveId
let bombMove

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

//FUNCTIONZZZ
function startGame() {
  play = true
  createGiant()
  throwSword()
  moveGiants()
  dropBomb()
}

startGame()


function throwSword() {
  //up arrow key command + reappear if disappears on top 
  document.addEventListener('keyup', (event) => {
    const key = event.key
    const swordId = setInterval(() => {
      if (key === 'ArrowUp' && sword < width) {
        cells[sword].classList.remove('sword')
        clearInterval(swordId)
        sword = (donQ - width)
        cells[sword].classList.add('sword')
      } else if (key === 'ArrowUp' && sword > width) {
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
      const currentCell = cells[sword]

      cells[sword].classList.remove('sword')
      cells[sword].classList.remove('giant')

      cells[sword].classList.add('explosion')
      //length of explosion
      setTimeout(() => {
        currentCell.classList.remove('explosion')
      }, 250)

      giants.splice(i, 1)
      // points++
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
          giants[i] += 10
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
          giants[i] += 10
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

    //if giant hits DQ
    for (let i = 0; i <= giants.length - 1; i++) {
      if (cells[donQ].classList.contains('giant', 'donQ')) {
        console.log('DQ clobbered')
        cells[giants[i]].classList.remove('donQ')
        clearInterval(giantMoveId)

        //gameOver()
      }
    }

    //if giant hits ground
    for (let i = 0; i <= giants.length - 1; i++) {
      if (giants[i] > (cells.length - (width - 1))) {
        console.log('Giants have breached')
        clearInterval(giantMoveId)

        //gameOver()
      }
    }

    //if all giants gone 
    if (giants.length === 0) {
      console.log('You win!!!')
      clearInterval(bombMove)
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
      clearInterval(bombMove)

      cells[bombPosition].classList.remove('bomb')
      cells[bombPosition].classList.add('explosion')

      setTimeout(() => {
        cells[bombPosition].classList.remove('explosion')
      }, 100)

      // points++

      dropBomb()

      //if bomb hits DQ
    } else if (cells[bombPosition].classList.contains('donQ')) {

      cells[bombPosition].classList.remove('bomb')
      cells[bombPosition].classList.remove('donQ')
      
      //gameOver()

      dropBomb()

      //if bomb hits ground
    } else if (giants.length > 0 && bombPosition >= 90 && bombPosition <= 100) {
      console.log('bomb hit ground')

      cells[bombPosition].classList.remove('bomb')
      cells[bombPosition].classList.add('explosion')

      console.log('ground exploded successfully')

      setTimeout(() => {
        cells[bombPosition].classList.remove('explosion')
      }, 90)

      console.log('ground explosion removed')

      clearInterval(bombMove)

      dropBomb()


      //regular bomb movements
    } else {
      cells[bombPosition].classList.remove('bomb')
      bombPosition += width
      cells[bombPosition].classList.add('bomb')

      console.log('bombs moving')

    }
  }, 700)

}




// function gameOver() {

// }

// gameOver()




//   alert you lose (inner HTML)

//   buttonnnn to restartLevel

//   clear everything & reload game board






// function youWin() {
// alert you win 
// button for restart/next level
//   clear everything & (re)load game board
// }