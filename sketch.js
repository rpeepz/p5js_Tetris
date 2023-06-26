//P5 tetris code
//Written entirely by Robert Papagna
const Width = 600
const Height = 650
const topPadding = 50
const bottomPadding = 20
const auxPadding = 25
const bgColor = 220
const windowColor = 255
const txtColor = 0
const txtSize = 16
let mainWindowArr
let blockSizeX 
let blockSizeY
let auxRightArr
let auxLeftArr
let scoreArr
let colorL
let colorJ
let colorT
let colorI
let colorS
let colorZ
let colorO
let currentPiece
let nextPiece
let heldPiece
var fr = 1
var blockID = 0
var score = 0
var PiecesArr = []

// game states
var started = -1
var paused = 1

const Direction = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
  rotate: 4,
  cw: 5,
  ccw: 6
}
const Pieces = {
  L: 0,
  J: 0,
  T: 0,
  I: 0,
  S: 0,
  Z: 0,
  O: 0
}

class Piece {
  constructor(letter, color) {
    this.letter = letter;
    this.color = color;
    this.orientation = 0;
    this.blockID = blockID++
    //inital position of blocks
    this.blocksX = []
    this.blocksY = []
    switch (letter) {
      case "L": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 5)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY,
                       mainWindowArr[1] + (blockSizeY * 2),
                       mainWindowArr[1] + (blockSizeY * 2)]
        break
      }
      case "J": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 4)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY,
                       mainWindowArr[1] + (blockSizeY * 2),
                       mainWindowArr[1] + (blockSizeY * 2)]
        break
      }
      case "T": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 6),
                       mainWindowArr[0] + (blockSizeX * 5)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1],
                       mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY]
        break
      }
      case "I": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY,
                       mainWindowArr[1] + (blockSizeY * 2),
                       mainWindowArr[1] + (blockSizeY * 3)]
        break
      }
      case "S": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 6),
                       mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 4)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY,
                       mainWindowArr[1] + blockSizeY]
        break
      }
      case "Z": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 3),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 5)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY,
                       mainWindowArr[1] + blockSizeY]
        break
      }
      case "O": {
        this.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 4),
                       mainWindowArr[0] + (blockSizeX * 5),
                       mainWindowArr[0] + (blockSizeX * 5)]
        this.blocksY = [mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY,
                       mainWindowArr[1],
                       mainWindowArr[1] + blockSizeY]
        break
      }
    }
  }

  update(color = this.color) {
    if (heldPiece && this.blockID == heldPiece.blockID)
      return
    fill(color)
    rect(this.blocksX[0], this.blocksY[0], blockSizeX, blockSizeY)
    rect(this.blocksX[1], this.blocksY[1], blockSizeX, blockSizeY)
    rect(this.blocksX[2], this.blocksY[2], blockSizeX, blockSizeY)
    rect(this.blocksX[3], this.blocksY[3], blockSizeX, blockSizeY)
  }

  move(direction, rotation) {
    var update = false
    switch (direction) {
      case Direction.down: {
        //check if blocks of piece are at bottom
        if (!this.blocksY.every(function(block) {
          if (block + blockSizeY >= mainWindowArr[1] + mainWindowArr[3])
            return false
          return true
        })) { break }
        //blank out previous blocks
        this.update(windowColor);
        //move blocks to new position
        this.blocksY.forEach(function(block, idx, array) {
          array[idx] = block + blockSizeY
        })
        update = true
        break
      }
      case Direction.left: {
        //check if blocks of piece can move left
        if (!this.blocksX.every(function(block) {
          if (block <= mainWindowArr[0])
            return false
          return true
        })) { break }
        //blank out previous blocks
        this.update(windowColor);
       //move blocks to new position
        this.blocksX.forEach(function(block, idx, array) {
          array[idx] = block - blockSizeX
        })
        update = true
        break
      }
      case Direction.right: {
        //check if blocks of piece can move right
        if (!this.blocksX.every(function(block) {
          if (block + blockSizeX >= mainWindowArr[0] + mainWindowArr[2])
            return false
          return true
        })) { break }
        //blank out previous blocks
        this.update(windowColor);
       //move blocks to new position
        this.blocksX.forEach(function(block, idx, array) {
          array[idx] = block + blockSizeX
        })
        update = true
        break
      }
      case Direction.up: {
        while(!this.collision(Direction.down) && this.move(Direction.down)) {}
        break
      }
      case Direction.rotate: {
        if (this.letter == 'O')
          break
        let mapped = []
        let bX = this.blocksX
        let bY = this.blocksY
        // map blocks to simplified grid
        this.blocksX.forEach(function(block, i) {
            mapped.push([((block - bX[1]) / blockSizeX),
                         ((bY[i] - bY[1]) / blockSizeY)])
        })

        //pivot piece about center
        mapped.forEach(function(m,i,arr) {
          if (rotation == Direction.cw)
            m[1] *= -1
          else
            m[0] *= -1
          let tmp = m[0]
          arr[i][0] = m[1]
          arr[i][1] = tmp
        })
        
        //revert back to coorinates
        let revertX = []
        let revertY = []
        mapped.forEach(function(m) {
          revertX.push((m[0] * blockSizeX) + bX[1])
          revertY.push((m[1] * blockSizeY) + bY[1])
        })

        //blank out old space
        this.update(windowColor)
        
        this.blocksX = revertX
        this.blocksY = revertY
        this.update()
        
        break
      }
    }
    if (update)
      this.update()
    return update
  }
  
  // sometimes collision acts funny when rotating
  collision(direction, rotation) {
    var collision = false
    var checkBlockIndex = []
    var bX = this.blocksX
    var bY = this.blocksY
    var col = this.color.levels
    
    var offsetX1
    var offsetY1
    var offsetX2
    var offsetY2

    switch (direction) {
      case Direction.down: {
        offsetX1 = blockSizeX/2
        offsetY1 = blockSizeY * 1.5
        offsetX2 = -(blockSizeX / 2)
        offsetY2 = -(blockSizeY * 0.5)
        break
      }
      case Direction.left: {
        offsetX1 = -(blockSizeX/2)
        offsetY1 = blockSizeY/2
        offsetX2 = -(blockSizeX / 2)
        offsetY2 = -(blockSizeY / 2)
        break    
      }
      case Direction.right: {
        offsetX1 = blockSizeX * 1.5
        offsetY1 = blockSizeY / 2
        offsetX2 = -(blockSizeX / 2)
        offsetY2 = -(blockSizeY / 2)
        break
      }
      case Direction.rotate: {
        if (this.letter == 'O')
          return true

        let mapped = []
        let bX = this.blocksX
        let bY = this.blocksY

        // map blocks to simplified grid
        this.blocksX.forEach(function(block, i) {
          mapped.push([((block - bX[1]) / blockSizeX),
                       ((bY[i] - bY[1]) / blockSizeY)])
        })

        //pivot piece about center
        mapped.forEach(function(m,i,arr) {
          if (rotation == Direction.cw)
            m[1] *= -1
          else
            m[0] *= -1
          let tmp = m[0]
          arr[i][0] = m[1]
          arr[i][1] = tmp
        })
        
        //revert back to coorinates
        let revertX = []
        let revertY = []
        mapped.forEach(function(m) {
          revertX.push((m[0] * blockSizeX) + bX[1])
          revertY.push((m[1] * blockSizeY) + bY[1])
        })

        let ID = this.blockID
        let available = revertX.every(function(rX, i) {
          let rY = revertY[i]
          let pixelColor = get(rX + (blockSizeX/2), rY + (blockSizeY/2))

          // check if block overlaps a clear space
          if (pixelColor[0] == windowColor && pixelColor[1] == windowColor && pixelColor[2] == windowColor)
            return true
          if (pixelColor[0] == bgColor && pixelColor[1] == bgColor && pixelColor[2] == bgColor)
            return false
          // check if block overlaps a block from any piece
          return (PiecesArr.every(function(p) {
            // ignore same piece
            if (p.blockID == ID)
              return true
            return (p.blocksX.every(function (pbx, idx) {
              let pby = p.blocksY[idx]
              if (rX == pbx && rY == pby)
                return false
              return true
            }))
          }))
        })
        return !available
      }
    }
    // get valid blocks to check
    bY.forEach(function(block, idx) {
      var toCheckX = bX[idx] + offsetX1
      var toCheckY = block + offsetY1
      
      var pixelColor = get(toCheckX, toCheckY)
      
      //check block below have different RGB than current block
      if (!(pixelColor[0] == col[0] && pixelColor[1] == col[1] && pixelColor[2] == col[2])) {
        checkBlockIndex.push(idx)
      }
      //block below has same color, make sure its not part of the same piece
      else {
        var notSamePiece = true
        toCheckX += offsetX2
        toCheckY += offsetY2
        bY.every(function(b, i) {
          if (b == toCheckY && bX[i] == toCheckX) {
            notSamePiece = false
            return false
          }
          return true  
        })
        if (notSamePiece) {
          checkBlockIndex.push(idx)
        }
      }
    })

    // no blocks to check
    if (!checkBlockIndex.length)
      return (collision = true)
    
    // run collision check on valid blocks
    checkBlockIndex.forEach(function(i, idx) {
      var pixelColor = get(bX[i] + offsetX1, bY[i] + offsetY1)
      if (!(pixelColor[0] == windowColor && pixelColor[1] == windowColor && pixelColor[2] == windowColor))
        collision = true
    })

    return collision
  }
  
  // some times clearRows acts funny when clearing 4 rows  
  clearRows() {
    var toRemove = []
    var toShift = []
    var bY = [...new Set(this.blocksY)]
    .sort(function(a, b) { return a > b })
    let scoreMultiply = 1

    // check rows of piece that just landed and clear
    bY.forEach(function(y, idx) {
      var clearRow = true
      y += (blockSizeY * 0.5)
      // check each block in the row
      for (var x = mainWindowArr[0] + (blockSizeX * 0.5); x < mainWindowArr[0] + mainWindowArr[2]; x += blockSizeX) {
        var pixelColor = get(x, y)
        if (pixelColor[0] == 255 && pixelColor[1] == 255 && pixelColor[2] == 255) {
          clearRow = false
          break
        }
      }
      if (clearRow) {
        score += (100 * scoreMultiply)
        scoreMultiply += 2
        updateScore()

        // gather all blocks X coordinate
        const rowX = Array.from({ length: 10 }, function(_, i) {
          return mainWindowArr[0] + (i * blockSizeX)
        })

        // use (x,y) to match against blocks of pieces in piece array
        // and remove cleared blocks
        y -= (blockSizeY * 0.5)
        rowX.forEach(function(x) {
          var noMatch = true
          PiecesArr.every(function(p, i, arr) {
            p.blocksX.forEach(function(pbx, idx) {
              var pby = p.blocksY[idx]
              if (x == pbx && y == pby) {
                arr[i].blocksY[idx] = Height + blockSizeY
                fill(windowColor)
                rect(x, y, blockSizeX, blockSizeY)
                noMatch = false
                return
              }
            })
            return noMatch
          })
        })

        // note pieces from array which all blocks are cleared
        PiecesArr.forEach(function(p, i) {
          var remove = p.blocksY.every(function(pby) {
            if (pby == Height + blockSizeY)
              return true
            return false
          })
          if (remove)
            toRemove.push(i)
        })

        // shift all blocks above cleared row, down once space
        PiecesArr.forEach(function(p, i, arr) {
          p.blocksX.forEach(function(pbx, idx) {
            var pby = p.blocksY[idx]
            if (pby < y && pby >= 0) {
              fill(windowColor)
              rect(pbx, pby, blockSizeX, blockSizeY)
              arr[i].blocksY[idx] += blockSizeY
              toShift.push(i)
            }
          })
        })
      }
    })
    
    // shift blocks
    let shift = [...new Set(toShift)];
    shift.forEach(function(i) {
      PiecesArr[i].update()
    })
        
    // remove cleared pieces
    let remove = [...new Set(toRemove)];
    remove.sort(function(a,b) {return b - a})
    for (let i = 0; i < remove.length; i++) {
      PiecesArr.splice(remove[i], 1);
    }

    return scoreMultiply
  }
}

function drawMainWindow() {
  //game space
  fill(windowColor)
  strokeWeight(0)
  var x1 = Width/4
  var y1 = topPadding
  var x2 = Width/2
  var y2 = Height - (bottomPadding + topPadding)
  rect(x1, y1, x2, y2)
  
  //grid
  strokeWeight(1)
  //vertical
  for (i = x1; i <= (Width/4)*3; i += x2 / 10) {
    line(i, y1, i, Height - (bottomPadding))
  }
  //horizontal
  for (i = y1; i <= Height - bottomPadding; i += y2 / 20)
  line(x1, i, x1*3, i)

  return [x1,y1,x2, y2]
}

function drawAuxWindow(title, offset) {
  let xPos = offset == "right" ? (Width/4)*3: 0
  var x1 = xPos + auxPadding
  var y1 = auxPadding
  var x2 = Width/4 - (auxPadding*2)
  var y2 = Height / 3
  //piece space
  fill(windowColor)
  rect(x1, y1, x2, y2)
  
  fill(txtColor)
  textSize(txtSize)
  textAlign(LEFT)
  
  strokeWeight(0)
  text(title, xPos + (auxPadding*2 + (auxPadding/4)), auxPadding * 2)
  strokeWeight(1)
  line(x1, auxPadding*3,
       (offset == "right" ? Width : Width/4) - auxPadding,
       auxPadding * 3)
  return [x1,y1*3,x2,y2-auxPadding]
}
        
function drawScoreWindow() {
  var x1 = auxLeftArr[0]
  var y1 = auxLeftArr[1] + auxLeftArr[3]
  var x2 = auxLeftArr[2]
  var y2 = auxLeftArr[1]
  fill(windowColor)
  rect(x1, y1, x2, y2)
  line(x1, y1 + (txtSize*1.2), x1 + x2, y1 + (txtSize*1.2))
  fill(100,140,50) //score color
  textAlign(CENTER)
  textSize(txtSize)
  strokeWeight(0)
  text("score", x1, y1, x2, y2)
  fill(txtColor)
  text(score, x1, y1 + (txtSize*1.2), x2, y2 - (txtSize*1.2))
  strokeWeight(1)
  return [x1,y1 + (txtSize*1.2), x2, y2 - (txtSize*1.2)]
}
      
function drawControlsWindow() {
  var x1 = auxRightArr[0]
  var y1 = auxRightArr[1] + auxRightArr[3]
  var x2 = auxRightArr[2]
  var y2 = auxRightArr[1] * 2
  fill(windowColor)
  rect(x1, y1, x2, y2)
  line(x1, y1 + (txtSize*1.2), x1 + x2, y1 + (txtSize*1.2))
  fill(100,140,50)
  textAlign(CENTER)
  textSize(txtSize)
  text("controls", x1, y1, x2, y2)
  textAlign(CENTER)
  let spacing = txtSize*1.2
  textSize(txtSize-2)
  fill(0)
  text("← or A  = left", x1, y1 + spacing, x2, y1 + spacing)
  text("→ or D = right", x1, y1 + spacing*2, x2, y1 + spacing*2)
  text("↑ or W = up", x1, y1 + spacing*3, x2, y1 + spacing*3)
  text("↓ or S = down", x1, y1 + spacing*4, x2, y1 + spacing*4)
  text("Q = rotate ⤷", x1, y1 + spacing*5, x2, y1 + spacing*5)
  text("E = rotate ⤶", x1, y1 + spacing*6, x2, y1 + spacing*6)
  text("space = hold", x1, y1 + spacing*7, x2, y1 + spacing*7)
}
      
function drawTitleWindow() {
  // remove old text
  noStroke()
  fill(bgColor)
  rect(mainWindowArr[0], mainWindowArr[1]/2, mainWindowArr[2], mainWindowArr[1] * 0.45)
  
  // draw game title
  if (started == -1 && paused == -1) {
    fill(txtColor)
    textSize(txtSize)
    textAlign(CENTER)
    text("Tetris", mainWindowArr[0], mainWindowArr[1]/2, mainWindowArr[2], mainWindowArr[1]/2)
  }
  
  // draw pause title
  else if (paused == 1) {
    fill(txtColor)
    textSize(txtSize)
    textAlign(CENTER)
    let title = (started == 1 ? "Paused" : "Press Enter to Play")
    text(title, mainWindowArr[0], mainWindowArr[1]/2, mainWindowArr[2], mainWindowArr[1]/2)
  }
  
  // draw game over
  else {
    fill(txtColor)
    textSize(txtSize)
    textAlign(CENTER)
    text("Game Over", mainWindowArr[0], mainWindowArr[1]/2, mainWindowArr[2], mainWindowArr[1]/2)
  }
  
  stroke(0)
}
      
function initPieces() {
  Pieces.L = new Piece("L", colorL)
  Pieces.J = new Piece("J", colorJ)
  Pieces.T = new Piece("T", colorT)
  Pieces.I = new Piece("I", colorI)
  Pieces.S = new Piece("S", colorS)
  Pieces.Z = new Piece("Z", colorZ)
  Pieces.O = new Piece("O", colorO)
}

function updateScore() {
  textAlign(CENTER)
  textSize(txtSize)
  fill(windowColor)
  rect(scoreArr[0], scoreArr[1], scoreArr[2], scoreArr[3])
  strokeWeight(0)
  fill(txtColor)
  text(score, scoreArr[0], scoreArr[1], scoreArr[2], scoreArr[3])
  strokeWeight(1)
}

function defineColors() {
  colorL = color(255, 145, 0)
  colorJ = color(40,40,255)
  colorT = color(255, 40, 255)
  colorI = color(40, 255, 255)
  colorS = color(40, 255, 40)
  colorZ = color(255, 40, 40)
  colorO = color(255, 255, 40)
}

function auxPiece(letter, posArr) {
  var widthGap
  var heightGap
  fill(windowColor)
  rect(posArr[0], posArr[1],
       posArr[2], posArr[3] - auxPadding)
  switch (letter) {
    case "L": {
      widthGap = posArr[2] - (blockSizeX*2)
      heightGap = posArr[3] - (blockSizeY*3)
      fill(colorL)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 , posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 , posArr[1] + heightGap/3 + (blockSizeY*2), blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2+blockSizeX, posArr[1] + heightGap/3 + (blockSizeY*2), blockSizeX, blockSizeY)
      break
    }
    case "J": {
      widthGap = posArr[2] - (blockSizeX*2)
      heightGap = posArr[3] - (blockSizeY*3)
      fill(colorJ)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3 + (blockSizeY*2), blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3 + (blockSizeY*2), blockSizeX, blockSizeY)
      break
    }
    case "T": {
      widthGap = posArr[2] - (blockSizeX*3)
      heightGap = posArr[3] - (blockSizeY*2)
      fill(colorT)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + (blockSizeX * 2), posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      break
    }
    case "I": {
      widthGap = posArr[2] - blockSizeX
      heightGap = posArr[3] - (blockSizeY*4)
      fill(colorI)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/4, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/4 + blockSizeY, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/4 + (blockSizeY * 2), blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/4 + (blockSizeY * 3), blockSizeX, blockSizeY)
      break
     }
    case "S": {
      widthGap = posArr[2] - (blockSizeX*3)
      heightGap = posArr[3] - (blockSizeY*2)
      fill(colorS)
      rect(posArr[0] + widthGap/2 + (blockSizeX * 2), posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      break
    }
    case "Z": {
      widthGap = posArr[2] - (blockSizeX*3)
      heightGap = posArr[3] - (blockSizeY*2)
      fill(colorZ)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + blockSizeX, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2 + (blockSizeX * 2), posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      break
    }
    case "O": {
      widthGap = posArr[2] - (blockSizeX*2)
      heightGap = posArr[3] - (blockSizeY*2)
      fill(colorO)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2+blockSizeX, posArr[1] + heightGap/3, blockSizeX, blockSizeY)
      rect(posArr[0] + widthGap/2+blockSizeX, posArr[1] + heightGap/3 + blockSizeY, blockSizeX, blockSizeY)
      break
    }
    default: {return}
  }
}

// sometimes holdPiece acts funny when swapping in a held piece
function holdPiece() {
  // remove current piece
  currentPiece.blocksX.forEach(function(bX, idx) {
    let bY = currentPiece.blocksY[idx]
    fill(windowColor)
    rect(bX, bY, blockSizeX, blockSizeY)
  })

  //swap pieces
  if (!heldPiece) {
    heldPiece = currentPiece
    currentPiece = nextPiece
    nextPiece = newPiece()
    auxPiece(nextPiece.letter, auxRightArr)
  }
  else {
      let tmp = heldPiece
      heldPiece = currentPiece
      currentPiece = tmp
  }

  // reset location for held letter
  switch (heldPiece.letter) {
    case "L": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 5)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY,
                           mainWindowArr[1] + (blockSizeY * 2),
                           mainWindowArr[1] + (blockSizeY * 2)]
      break
      }
    case "J": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 4)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY,
                           mainWindowArr[1] + (blockSizeY * 2),
                           mainWindowArr[1] + (blockSizeY * 2)]
      break
    }
    case "T": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 6),
                           mainWindowArr[0] + (blockSizeX * 5)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1],
                           mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY]
      break
    }
    case "I": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY,
                           mainWindowArr[1] + (blockSizeY * 2),
                           mainWindowArr[1] + (blockSizeY * 3)]
      break
    }
    case "S": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 6),
                           mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 4)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY,
                           mainWindowArr[1] + blockSizeY]
      break
    }
    case "Z": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 3),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 5)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY,
                           mainWindowArr[1] + blockSizeY]
      break
    }
    case "O": {
      heldPiece.blocksX = [mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 4),
                           mainWindowArr[0] + (blockSizeX * 5),
                           mainWindowArr[0] + (blockSizeX * 5)]
      heldPiece.blocksY = [mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY,
                           mainWindowArr[1],
                           mainWindowArr[1] + blockSizeY]
      break
    }
  }
  auxPiece(heldPiece.letter, auxLeftArr)
  spawnPiece(currentPiece)
}

function newPiece() {
  var rand = Math.floor(Math.random() * Object.keys(Pieces).length);
  let newPiece = Pieces[Object.keys(Pieces)[rand]]

  Pieces[newPiece.letter] = new Piece(newPiece.letter, newPiece.color)
  return newPiece
}

/*
  TODO
  perhaps optimize this as it is called only a few times
  and some other code is used near the calls repetitively
*/
function spawnPiece(piece) {
  PiecesArr.push(piece)
  piece.update()
}

function restartGame() {
    score = 0
    blockID = 0
    PiecesArr = []

    drawMainWindow()
    drawAuxWindow("Next", offset = "right")
    drawAuxWindow("Held", offset = "left")
    drawScoreWindow()
    drawTitleWindow()

    currentPiece = newPiece()
    spawnPiece(currentPiece)
  
    nextPiece = newPiece()
    auxPiece(nextPiece.letter, auxRightArr)  
}
      
function setup() {
  createCanvas(Width, Height);
  
  background(bgColor);

  defineColors();
  mainWindowArr = drawMainWindow()
  blockSizeX = mainWindowArr[2] / 10
  blockSizeY = mainWindowArr[3] / 20

  auxRightArr = drawAuxWindow("Next", offset = "right")
  auxLeftArr = drawAuxWindow("Held", offset = "left")

  scoreArr = drawScoreWindow()
  drawControlsWindow()
  drawTitleWindow()

  initPieces()

  currentPiece = newPiece()
  spawnPiece(currentPiece)
  
  nextPiece = newPiece()
  auxPiece(nextPiece.letter, auxRightArr)

  frameRate(fr)
}

function draw() {
  // do nothing if paused or game over
  if (paused == 1 || (started == 1 && paused == -1))
    return

  let nextID
  if (currentPiece.collision(Direction.down)) {
    nextID = nextPiece.blockID
    if(currentPiece.clearRows() > 1) {
      // increase speed
      // frameRate(fr)
    }
    currentPiece = nextPiece
    spawnPiece(currentPiece)
    nextPiece = newPiece()
    auxPiece(nextPiece.letter, auxRightArr)
  }
  if (!currentPiece.collision(Direction.down)) {
    if (currentPiece.blockID != nextID)
      currentPiece.move(Direction.down)
  }
  else {
    started = 1
    paused = -1
    drawTitleWindow()
  }
  
//  score += 100
//  updateScore()

}
  
function keyPressed() {

  //Enter
  if (keyCode === 13) {
    // start new game
    if (started == -1 && paused == 1) {
      paused = -1
    } 
    // pause
    else if (started == -1 && paused == -1) {
      started = 1
      paused = 1
    }
    // unpuase
    else if (started == 1 && paused == 1) {
      started = -1
      paused = -1
    }
    // restart
    else if (started == 1 && paused == -1) {
      restartGame()
      started = -1
      paused = 1
    }
    drawTitleWindow() 
  }
  // do nothing if paused or game over
  if (paused == 1 || (started == 1 && paused == -1))
    return

  // down ↓ or S
  if (keyCode === DOWN_ARROW || keyCode == 83) {
    if (!currentPiece.collision(Direction.down)) {
      currentPiece.move(Direction.down)
    }
  }
  // up ↑ or W
  else if (keyCode === UP_ARROW || keyCode == 87) {
    currentPiece.move(Direction.up)
  }
  // right → or D
  else if (keyCode === RIGHT_ARROW || keyCode == 68) {
    if (!currentPiece.collision(Direction.right)) {
      currentPiece.move(Direction.right);
    }
  }
  // Left ← or A
  else if (keyCode === LEFT_ARROW || keyCode == 65) {
    if (!currentPiece.collision(Direction.left)) {
      currentPiece.move(Direction.left);
    }
  }
  // E
  else if (keyCode === 69) {
    if (!currentPiece.collision(Direction.rotate, Direction.cw))
      currentPiece.move(Direction.rotate, Direction.cw);
  }
  // Q
  else if (keyCode === 81) {
    if (!currentPiece.collision(Direction.rotate, Direction.ccw))
      currentPiece.move(Direction.rotate, Direction.ccw);
  }
  //Space
  else if (keyCode === 32) {
    holdPiece()
  }
  return false; // prevent any default behaviour
} 
