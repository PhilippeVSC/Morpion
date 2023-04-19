const button = document.getElementsByClassName('game_button');
const img = document.getElementsByClassName('game_img');

let turn = 0;

let state = 'play';

let score_x = 0;
let score_o = 0;

var grid = [
    [{},{},{}],
    [{},{},{}],
    [{},{},{}]
];

function darkmode() {
    console.log('i');
    var myDiv = document.getElementsByClassName('darkmode-toggle')[0]; // Récupérer la div cible
    var body = document.body;

    myDiv.classList.toggle('active');
    body.classList.toggle('lightmode');
}

const o_img = 'src/img/o.svg'
const x_img = 'src/img/x.svg'

function btn(button) {
    if(state === 'play'){
        let buttonXY = positionToCoordinates(button);
        let x = buttonXY[0], y = buttonXY[1];

        if (grid[x][y]["symbol"] == undefined) { 
            let symbol = "";
            turn++;
            if (turn%2 == 1) {
                symbol = "X";
            } else {
                symbol = "O";
            }
            grid[x][y] = {"symbol" : symbol, "placedTurn" : turn};
            placeSymbol(button, symbol);
            
            if (winCheck(x, y)) {
                win(symbol);
            }

            if(turn === 9 && !winCheck(x, y)){
                win('nul');
            }
        }
    }
}

function placeSymbol(button, symbol) {
    switch(symbol) {
        case 'X':
            img[button].style.display = 'block';
            img[button].src = x_img;
            img[button].classList.add('green');
        break;
        case 'O':
            img[button].style.display = 'block';
            img[button].src = o_img;
            img[button].classList.add('purple')
        break;
    }
}

function positionToCoordinates(position) {
    let x = position % 3;
    let y = Math.floor(position / 3);
    return [x, y];
}

function coordinatesToPosition(coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];
    let position = x + y*3;
    return position;
}


function winCheck(x, y) {
    let symbol = grid[x][y]["symbol"];
    let verticalMatch = 0;
    let horizontalMatch = 0;
    let diagonalLtoRMatch = 0; // Diagonal top left to bottom right
    let diagonalRtoLMatch = 0; // Diagonal top right to bottom left

    // Check top
    if (y > 0) {
        if (grid[x][y-1]["symbol"] == symbol) {
            if (y == 2 && grid[x][y-2]["symbol"] == symbol) {
                return 1;
            }
            verticalMatch++;
        }
        // Check top left
        if (x > 0 && grid[x-1][y-1]["symbol"] == symbol) {
            if (x == 2 && y == 2 && grid[x-2][y-2]["symbol"] == symbol) {
                return 1;
            }
            diagonalLtoRMatch++;
        }
        // Check top right
        if (x < 2 && grid[x+1][y-1]["symbol"] == symbol) {
            if (x == 0 && y == 2 && grid[x+2][y-2]["symbol"] == symbol) {
                return 1;
            }
            diagonalRtoLMatch++;
        }
    }
    // Check bottom
    if (y < 2) {
        if (grid[x][y+1]["symbol"] == symbol) {
            if (y == 0 && grid[x][y+2]["symbol"] == symbol) {
                return 1;
            }
            verticalMatch++;
        }
        // Check bottom left
        if (x > 0 && grid[x-1][y+1]["symbol"] == symbol) {
            if (x == 2 && y == 0 && grid[x-2][y+2]["symbol"] == symbol) {
                return 1;
            }
            diagonalRtoLMatch++;
        }
        // Check bottom right
        if (x < 2 && grid[x+1][y+1]["symbol"] == symbol) {
            if (x == 0 && y == 0 && grid[x+2][y+2]["symbol"] == symbol) {
                return 1;
            }
            diagonalLtoRMatch++;
        }
    }
    // Check left
    if (x > 0 && grid[x-1][y]["symbol"] == symbol) {
        if (x == 2 && grid[x-2][y]["symbol"] == symbol) {
            return 1;
        }
        horizontalMatch++;
    }
    // Check right
    if (x < 2 && grid[x+1][y]["symbol"] == symbol) {
        if (x == 0 && grid[x+2][y]["symbol"] == symbol) {
            return 1;
        }
        horizontalMatch++;
    }

    if (horizontalMatch == 2 || verticalMatch == 2 || diagonalRtoLMatch == 2 || diagonalLtoRMatch == 2) {
        return 1;
    }
    return;
}

function win(symbol) {
    let score_text = document.getElementsByClassName('score_text')[0];
    let score_icon = document.getElementsByClassName('score_img')[0];
    let score_background = document.getElementsByClassName('icon_container')[0];

    switch(symbol) {
        case 'X':
            score_text.innerHTML = 'remporte la partie';
            score_icon.src = 'src/img/x.svg';
            score_background.style.display = 'flex';
            score_background.style.backgroundColor = '#BCEB3C';

            score_x++
            document.getElementsByClassName('score_x_val')[0].innerHTML = score_x
        break;
        case 'O':
            score_text.innerHTML = 'remporte la partie';
            score_icon.src = 'src/img/o.svg';
            score_background.style.display = 'flex';
            score_background.style.backgroundColor = '#A58BFF';

            score_o++
            document.getElementsByClassName('score_o_val')[0].innerHTML = score_o
        break;
        case 'nul':
            score_text.innerHTML = 'Égalité';
            score_icon.src = '';
            score_background.style.display = 'none';

            console.log('égalité');
        break;
    }

    setTimeout(() => {
        score_text.innerHTML = '';
        score_icon.src = '';
        score_background.style.display = 'none';
    }, 2500);

    state = 'end';
    newGame();
}

function newGame() {
    setTimeout(() => {
        for(i = 0; i < 9; i++){
            img[i].style.display = 'none';
            img[i].src = '';
            img[i].classList.remove('green');
            img[i].classList.remove('purple');
        }

        grid = [
            [{},{},{}],
            [{},{},{}],
            [{},{},{}]
        ];

        turn = 0;
        state = 'play';
    }, 2500);
}