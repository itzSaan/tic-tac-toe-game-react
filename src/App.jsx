import React, { useState, useSound, useEffect } from "react";
import SingleBox from "./components/SingleBox";
import PlayerModal from "./components/PlayerModal";
import StatusModal from "./components/StatusModal";

const squares = Array(9).fill(null);
const clickSound = new Audio('audio/sound-1.mp3');
const uiSound = new Audio('audio/finger-snap.mp3');
const winSound = new Audio('audio/success.mp3');
const drawSound = new Audio('audio/draw-tone.mp3');
// localStorage.clear();

const GameBox = () => {
  const [board, setBoard] = useState(squares);
  const [xIsNext, setXIsNext] = useState(true);
  const [players, setPlayers] = useState({
    p1name: 'Aryan',
    p1win:  0,
    p1sign:  'x.png',
    p2name: 'Neha',
    p2win:  0,
    p2sign:  'o.png',
  })
  const [winner, setWinner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isStatuxModalOpen, setIsStatusModalOpen] = useState(true);


  useEffect(() => {
    const gameData = JSON.parse(localStorage.getItem('gameData'))
    if(gameData) setPlayers(gameData);
  }, []);
    

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    clickSound.play();

    const newWinner = calculateWinner(newBoard);

    if (newWinner) {
      winSound.play();
      setWinner(newWinner);
      setIsStatusModalOpen(true);      
      updateWinCount(newWinner);
    } else if (newBoard.every((square) => square !== null)) {
      drawSound.play();
      setWinner('Draw');
      setIsStatusModalOpen(true)
    }
  };

  const updateWinCount = (newWinner) => {
    setPlayers((prevPlayers)=> {
      const updatedPlayers = {...prevPlayers};
      if(newWinner === 'X') {
        updatedPlayers.p1win += 1;
      } else if (newWinner === 'O') {
        updatedPlayers.p2win += 1;
      }
      localStorage.setItem('gameData', JSON.stringify(updatedPlayers));
      return updatedPlayers;
    })
  }

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    uiSound.play();
    setBoard(squares);
    setXIsNext(true);
    setWinner(null);
  };

  const resetGameToHome = () => {
    setIsModalOpen(true);
    resetGame();
  };

  const handleInputChange =(e) => {
    const { name, value } = e.target;
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [name]: value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uiSound.play();
    localStorage.setItem('gameData', JSON.stringify(players));
    setIsModalOpen(false);
  };

  const [audio] = useState(new Audio('audio/game-music-loop-14.mp3'));

  useEffect(() => {
    if(isSoundOn) {
      audio.play();
      audio.loop = true;
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isSoundOn])

  const handleSoundOn = () => {
    uiSound.play();
    setIsSoundOn((prev) => !prev);
  };

  return (
    <>
    {/* Modal */}
    {winner &&  <StatusModal winner={winner} 
    handleHomeButton={resetGameToHome}
    handleClick={resetGame} 
    players={players}
    isStatusModalOpen={isStatuxModalOpen} /> }

    <PlayerModal players={players} isModalOpen={isModalOpen} handleInputChange={(e)=> handleInputChange(e)} handleSubmit={(e)=> handleSubmit(e)}/>

      <div className="wrapper flex flex-col gap-8">        
        <div className="menu-bar flex justify-end gap-4">
          <button className="mr-auto bg-gradient-to-t from-green-700 to-green-400 outline outline-4 outline-green-500 p-4 text-white w-14 h-14 rounded-xl">
            <img className="" src="img/pause.svg" alt="play" />
          </button>
          <button
            className="bg-gradient-to-t from-green-700 to-green-400 outline outline-4 outline-green-500 p-4 text-white w-14 h-14 rounded-xl"
            onClick={() => handleSoundOn()}
          >
            <img src={isSoundOn ? 'img/music-off.svg' : 'img/music.svg'} alt="play" />
          </button>
          <button
            className="bg-gradient-to-t from-green-700 to-green-400 outline outline-4 outline-green-500 p-4 text-white w-14 h-14 rounded-xl"
            onClick={resetGame}
          >
            <img src="img/reload.svg" alt="reset" />
          </button>
        </div>
        <div className="status-bar">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className={` bg-slate-100/50 backdrop-blur-sm ${xIsNext && "bg-gradient-to-t from-green-700 to-green-400 border border-4 border-green-500 outline-dashed outline-3 outline-offset-2" } text-white w-full h-16 px-3 rounded-xl flex justify-between items-center`}>
              <div>
                <p className="text-shadow font-bold">{players.p1name}</p>
                <p className="text-shadow font-bold">Win : {players.p1win}</p>
              </div>
              <img src={`img/${players.p1sign}`} width={36} alt="" />
            </div>
            <div className={`bg-slate-100/50 backdrop-blur-sm ${!xIsNext && "bg-gradient-to-t from-green-700 to-green-400 border border-4 border-green-500 outline-dashed outline-3 outline-offset-2" } text-white w-full h-16 px-3 rounded-xl flex justify-between items-center`}>
              <div>
                <p className="text-shadow font-bold">{players.p2name}</p>
                <p className="text-shadow font-bold">Win : {players.p2win}</p>
              </div>
              <img src={`img/${players.p2sign}`} width={36} alt="" />
            </div>
            <div className="place-self-center text-white">
             {xIsNext && <span className=" text-shadow italic font-bold">Your Turn</span>}
            </div>
            <div className="place-self-center text-white">
            {!xIsNext && <span className=" text-shadow italic font-bold">Your Turn</span>}
            </div>
          </div>
        </div>
        <div className="game-box">
          <div className="divider d-h d-1"></div>
          <div className="divider d-h d-2"></div>
          <div className="divider d-v d-3"></div>
          <div className="divider d-v d-4"></div>
          {board.map((value, index) => (
            <SingleBox
              key={index}
              value={value}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

function App() {
  return <GameBox />;
}

export default App;
