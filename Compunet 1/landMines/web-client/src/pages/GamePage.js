import Board from '../components/Board.js';
import delegate from '../services/iceDelegate.js';
// import axios from "axios";

const showCell = async (cellId) => {
  const id = cellId.split('-');
  const i = parseInt(id[0]);
  const j = parseInt(id[1]);

  let data = await delegate.selectCell(i , j)

  const win = data.win;
  const end = data.gameEnd;
  console.log({ win, end });
  if (end) {
    if (win) {
      alert('You Win!!');
    } else {
      alert('You Loss :c');
    }
  }

  ReloadBoard(data.board)
};


const ReloadBoard = (boardMatrix) => {
  const container = document.getElementById('home-page');
  container.removeChild(container.querySelector('.board'));
  const board = Board(boardMatrix, showCell);
  container.appendChild(board);

}

function Game() {
  const container = document.createElement('div');
  container.id = 'home-page';
  const title = document.createElement('h1');
  title.innerText = 'Land Mines';
  title.classList = 'title';
  container.appendChild(title);


  const button = document.createElement("button")
  button.textContent = "Reset"
  container.appendChild(button);

  button.onclick = async() => {
    const board = await delegate.resetBoard();
    ReloadBoard(board)
  }


  const cells = delegate.getBoard();
  cells.then((data) => {
    const board = Board(data, showCell);
    container.appendChild(board);
  });

  return container;
}

export default Game;
