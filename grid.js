// ? SQUARE GRID:
const grid = document.querySelector('.grid')
// ? Specify the width of the grid.
const width = 5
const cells = []
let harry = 6

for (let index = 0; index < width ** 2; index++) {
  // ? Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  // ? Number each cell by its index.
  cell.innerHTML = index
  // ? Set the width and height of my cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}

// ! This block of code is super common
cells[harry].classList.remove('harry')
harry += 1
cells[harry].classList.add('harry')

document.addEventListener('keyup', (event) => {
  const key = event.key

  if (key === 'd' && !(harry % width === width - 1)) {
    cells[harry].classList.remove('harry')
    harry += 1
    cells[harry].classList.add('harry')
  // ? This below line if for if you don't want to boundary the whole wall.
  // } else if (key === 'a' && !(harry === 0)) {
  } else if (key === 'a' && !(harry % width === 0)) {
    cells[harry].classList.remove('harry')
    harry -= 1
    cells[harry].classList.add('harry')
  } else if (key === 's' && !(harry + width >= width ** 2)) {
    cells[harry].classList.remove('harry')
    harry += width
    cells[harry].classList.add('harry')
  } else if (key === 'w' && !(harry < width)) {
    cells[harry].classList.remove('harry')
    harry -= width
    cells[harry].classList.add('harry')
  }
})
























// ? GENERATING GRIDS OF DIFFERENT WIDTHS AND HEIGHTS
// ! To make this work, adjust the width and height of grid in CSS
// ! to be the right proportions.
// const grid = document.querySelector('.grid')
// // ? Specify the width of the grid.

// const width = 8
// const height = 10
// const cells = []

// for (let index = 0; index < width * height; index++) {
//   // ? Generate each element
//   const cell = document.createElement('div')
//   cell.classList.add('cell')
//   grid.appendChild(cell)
//   cells.push(cell)
//   // ? Number each cell by its index.
//   cell.innerHTML = index
//   // ? Set the width and height of my cells
//   cell.style.width = `${100 / width}%`
//   cell.style.height = `${100 / height}%`
// }


