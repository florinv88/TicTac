import { useState } from 'react'
import { nanoid } from 'nanoid'
import Box from './components/Box';

//IMAGES
import x from './img/x.png'
import xMare from './img/xMare.png'
import xBG from './img/xBG.png'
import xGray from './img/xGray.png'
import o from './img/o.png'
import oBG from './img/oBG.png'
import oGray from './img/oGray.png'
import reset from './img/reset.png'



const App = () => {

  //states
  const [playerPick, setPlayerPick] = useState("O")
  const [CPUPick, setCPUPick] = useState("X")
  const [startGame, setStartGame] = useState(false)
  const [CPUp1, setCPUp1] = useState(false)
  const [matrix, setMatrix] = useState([[null, null, null], [null, null, null], [null, null, null]])
  const [winnerGame, setWinnerGame] = useState(null)
  const [restart, setRestart] = useState(false)
  const [refresh, setRefresh] = useState(true)


  //FUNCTIONS

  //cold start of the game
  const start = () => {
    setStartGame(true)
    setMatrix([[null, null, null], [null, null, null], [null, null, null]])
    if (playerPick === "O") {
      setCPUp1(true)
      setPlayerPick("O")
      setCPUPick("X")
      setMatrix([[null, null, null], [null, null, null], [null, null, null]])
      let line = Math.floor(Math.random() * 3)
      let poz = Math.floor(Math.random() * 3)
      if (line === 1) line--;
      if (poz === 1) poz--;
      //update the matrix
      const tempMatrix = matrix
      tempMatrix[line][poz] = "X"
      setMatrix(tempMatrix)
    }
    else {
      setStartGame(true)
      setCPUp1(true)
      setPlayerPick("X")
      setCPUPick("O")
      setMatrix([[null, null, null], [null, null, null], [null, null, null]])
    }
  }

  const restartGame = () => {
    setStartGame(false)
    setMatrix([[null, null, null], [null, null, null], [null, null, null]])
    setPlayerPick("O")
    setCPUPick("X")
    setRestart(false)
    setWinnerGame(null)

  }

  //Function to update the matrix 
  const updateMatrix = (line, poz, pick) => {
    const tempMatrix = matrix
    tempMatrix[line][poz] = pick

    setMatrix(tempMatrix)
    setRefresh(prevState => !prevState)
  }
  const updateWinner = (symbol) => {
    setWinnerGame(symbol)
  }
  const updateCPU = () => {
    setCPUp1(false)
  }
  const triggerRerender = () => {
    setRefresh(prevState => !prevState)

  }





  return (
    <div className="page">
      {startGame === false && <div className="menuStart">
        <div className="icons">
          <img src={x} alt="x icon" />
          <img src={o} alt="o icon" />
        </div>
        <div className="player__pick">
          <h3>PICK YOUR MARK</h3>
          <div className="player__pick__buttons">
            <div onClick={() => (setPlayerPick("X"), setCPUPick("O"))} className={`${playerPick === "X" && "selected"}`}>
              <img src={playerPick === "X" ? xBG : xGray} alt="x icon" />
            </div>
            <div onClick={() => (setPlayerPick("O"), setCPUPick("X"))} className={`${playerPick === "O" && "selected"}`}>
              <img src={playerPick === "O" ? oBG : oGray} alt="o icon" />
            </div>
          </div>
          <h4>REMEMBER : X GOES FIRST</h4>
        </div>
        <div className="newGame" onClick={() => start()}>
          <h2>NEW GAME (vs CPU)</h2>
        </div>
      </div>}

      {startGame === true &&

        <div className="game">
          <div className="header">
            <img src={x} alt="x" />
            <img src={o} alt="o" />
            <img src={reset} alt="reset" onClick={() => setRestart(true)} />
          </div>
          <div key={Math.random() * 99} className="boxes">
            <div className="boxes__line">
              {[1, 2, 3].map(item => {
                return <Box
                  key={nanoid()}
                  idx={item}
                  xIcon={xBG}
                  oIcon={o}
                  matrix={matrix}
                  CPUp1={CPUp1}
                  updateCPU={updateCPU}
                  playerPick={playerPick}
                  CPUPick={CPUPick}
                  updateMatrix={updateMatrix}
                  winnerGame={winnerGame}
                  setWinnerGame={setWinnerGame}
                  triggerRerender={triggerRerender}
                  updateWinner={updateWinner}
                />
              })}
            </div>
            <div className="boxes__line">
              {[4, 5, 6].map(item => {
                return <Box
                  key={nanoid()}
                  idx={item}
                  xIcon={xBG}
                  oIcon={o}
                  matrix={matrix}
                  CPUp1={CPUp1}
                  updateCPU={updateCPU}
                  playerPick={playerPick}
                  CPUPick={CPUPick}
                  updateMatrix={updateMatrix}
                  winnerGame={winnerGame}
                  setWinnerGame={setWinnerGame}
                  triggerRerender={triggerRerender}
                  updateWinner={updateWinner}
                />
              })}
            </div>
            <div className="boxes__line">
              {[7, 8, 9].map(item => {
                return <Box
                  key={nanoid()}
                  idx={item}
                  xIcon={xBG}
                  oIcon={o}
                  matrix={matrix}
                  CPUp1={CPUp1}
                  updateCPU={updateCPU}
                  playerPick={playerPick}
                  CPUPick={CPUPick}
                  updateMatrix={updateMatrix}
                  winnerGame={winnerGame}
                  setWinnerGame={setWinnerGame}
                  triggerRerender={triggerRerender}
                  updateWinner={updateWinner}
                />
              })}
            </div>



          </div>
        </div>

      }

      {restart === true && <div className="restart">
        <div className="background"></div>
        <div className="content">
          <h2>RESTART GAME ?</h2>
          <section>
            <div onClick={() => setRestart(false)}>
              <h2>NO , CANCEL</h2>
            </div>
            <div>
              <h2 onClick={restartGame}>YES , RESTART</h2>
            </div>
          </section>
        </div>
      </div >}

      {
        winnerGame && <div className="winnerGame">

          <section>
            <h2>{`${winnerGame === CPUPick ? "YOU LOSE !" : (winnerGame === "tie" ? "TIE !" : "YOU WON !")}`}</h2>
            {winnerGame === "tie" && <h4>PLEASE PRACTICE MORE ...</h4>}
            {winnerGame === CPUPick && <h4>THIS GAME IS TO DIFFICULT FOR YOU ...</h4>}
            {winnerGame === playerPick && <h4>You got lucky !</h4>}
            <div onClick={restartGame}>
              <h3>PLAY AGAIN</h3>
            </div>
          </section>
        </div>
      }



    </div >
  );
}

export default App;