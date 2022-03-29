


$(document).ready(function(){
    (function($) {
        $.fn.morpion = function() {
            let board = $(this)[0]
            let currentPlayer = "X"
            let gameOn = true
            let winDisplay = document.querySelector('.win-display')
            let currentContainer = document.getElementById('currentPlayer')
            currentContainer.innerHTML = `Joueur ${currentPlayer}`
            let cells = board.querySelectorAll('.cell')
            let i = 0
            let boardCells = ["", "", "", "", "", "","", "", ""]
            const winPossibilities = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]

            ]
            let replay = document.getElementById('replay')
            replay.addEventListener('click', reset)
            cells.forEach(cell => {
                cell.setAttribute('data-name', i)
                i++
                cell.addEventListener('click',playTurn)
                
                
            });
            function playTurn (){
                let cellTargeted = parseInt(this.dataset.name)
                if(boardCells[cellTargeted] != "" || gameOn == false) {
                    return
                }
                boardCells[cellTargeted] = currentPlayer
                this.innerHTML = currentPlayer
                console.log(boardCells)
                currentPlayer = currentPlayer == "X" ? "O" : "X"
                currentContainer.innerHTML = `Joueur ${currentPlayer}`
                checkWin()
            }

            function checkWin() {
                for(winPossibility of winPossibilities) {
                    let poss1 = winPossibility[0]
                    let poss2 = winPossibility[1]
                    let poss3 = winPossibility[2]
                    
                    
                    if(boardCells[poss1] == "" || boardCells[poss2] == "" || boardCells[poss3] == ""){
                        continue
                    }
                    if(boardCells[poss1] == boardCells[poss2] && boardCells[poss2] == boardCells[poss3]) {
                        currentPlayer = currentPlayer == "X" ? "O" : "X"
                        winDisplay.innerHTML = `Joueur ${currentPlayer} a gagné !`
                        board.classList.add('won')
                        gameOn = false
                        addPoint(currentPlayer)
                    }
                    if(!boardCells.includes('') && gameOn == true){
                        winDisplay.innerHTML = "Egalité !"
                        board.classList.add('won')

                    }
                }
            }

            function addPoint(player) {
                if(player == "X") {
                    document.getElementById('playerOne').innerHTML++
                } else {
                    document.getElementById('playerTwo').innerHTML++
                }
            }

            function reset() {
                gameOn = true
                boardCells = ["", "", "", "", "", "","", "", ""]
                console.log(boardCells)
                cells.forEach(cell => {
                    cell.innerHTML = ""
                })
                currentPlayer = "X"
                currentContainer.innerHTML = `Joueur ${currentPlayer}`
                board.classList.remove('won')
            }
            
        };
    })(jQuery);

    $('#grid').morpion();
  });