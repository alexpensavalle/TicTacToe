var player = 1;
var lineColor = "#ddd";

var canvas = document.getElementById('tic-tac-toe-board');

/*HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
Parameter '2d' leads to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context (from MDN)*/
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3; // gets size of columns AND rows, since our canvas is a square
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);//The value to add to x and y coordinates 

//This is helpful for once we want to implement winner logic, but not necessary for assignment:
//Set up "2D" array, 3x3 squares (doesn't render board)
function getInitialBoard (defaultValue) {
  var board = [];

  for (var x = 0;x < 3;x++) {
    board.push([]);//push an empty array (y) into each original array (x)

    for (var y = 0;y < 3;y++) {
      board[x].push(defaultValue);//push a default value into each (x,y)
    }
  }
  return board;
}

//Run the above function to init a global empty board:
var board = getInitialBoard("");//actually create the board, default value is simply an empty string (NOT USED IN THIS PROJECT...MAYBE SOMEDAY)


//Add a playing piece using the mouse!
function addPlayingPiece (mouse) {
  var xCordinate;//can be 0,1,2
  var yCordinate;//can be 0,1,2

  for (var x = 0;x < 3;x++) {
    for (var y = 0;y < 3;y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;//height and width of square

      if (//if the mouse is "in bounds"
        (mouse.x >= xCordinate) && 
        (mouse.x <= xCordinate + sectionSize) &&
        (mouse.y >= yCordinate) && 
        (mouse.y <= yCordinate + sectionSize)
        ) {
            clearPlayingArea(xCordinate, yCordinate);//aka make that square white....then:

            if (player === 1)
              drawX(xCordinate, yCordinate);
            else
              drawO(xCordinate, yCordinate);
            
          }//end of outer if
    }//end of inner for loop
  }//end of outer for loop
}//end of function

//Make a square white aka empty
function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}

/*This function uses built-in HTML canvas methods (and some trig) to draw a circle in the selected square*/
function drawO (xCordinate, yCordinate) {
  //set up variables for context.arc:
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;
  
  //built-in canvas functions (using our "context")
  context.lineWidth = 10;
  context.strokeStyle = "#221199";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();//actually draws circle
}

/*This function uses built-in HTML canvas methods to draw an 'X' in the selected square*/
function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#AA1110";
  context.beginPath();
  var offset = 50;
  
  //First line of the X aka /
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);
  
  //Second line of X aka \
  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);
  
  /*    / + \ = X     */
  context.stroke();
}

/*This function uses built-in HTML canvas methods to draw the tic tac toe "grid"*/
function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  
  //Horizontal lines 
  for (var y = 1;y <= 2;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  //Vertical lines 
  for (var x = 1;x <= 2;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();//draw
}

//Rendering board:
drawLines(10, lineColor);

/*This function gets the mouse position in relation to the canvas*/
function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }//(got some help for this online!)
}

//Switch players upon click completion "mouseup", AND retrieve mouse position on canvas
canvas.addEventListener('mouseup', function (event) {
  if (player === 1)
    player = 2;
  else
    player = 1;

  //Upon click and unclick, 
  var canvasMousePosition = getCanvasMousePosition(event);
  
  //Add piece, and render board
  addPlayingPiece(canvasMousePosition);
  drawLines(10, lineColor);
});