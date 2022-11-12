import { useState } from "react";

const Box = ({ oIcon, xIcon, idx, matrix, updateMatrix, playerPick, CPUPick, CPUp1, updateCPU, winnerGame, updateWinner, triggerRerender }) => {

    //states
    const [refresh, setRefresh] = useState(true)


    //Calculate the position of the box in the matrix
    let poz;
    let line;
    if (idx >= 1 && idx <= 3) { poz = idx - 1; line = 0 }
    else
        if (idx >= 4 && idx <= 6) { poz = idx - 4; line = 1 }
        else
            if (idx >= 7 && idx <= 9) { poz = idx - 7; line = 2 }


    //Function to check if there is any way to create a triangle / to block a triangle

    const checkT = (symbol) => {
        for (let i = 0; i < 3; i++) {
            let c1, c2
            let vecLine = matrix[i].filter(element => element !== null)

            if (vecLine.length === 1 && vecLine[0] === symbol) {
                console.log(vecLine)

                //find the null spots
                if (matrix[i][0]) { c1 = 1; c2 = 2 }
                else if (matrix[i][1]) { c1 = 0; c2 = 2 }
                else { c1 = 0; c2 = 1 }
                //check the null spots
                //for c1
                let number = 0
                let ok = true
                for (let j = 0; j < 3; j++)
                    if (matrix[j][c1] === symbol) number++
                    else {
                        if (matrix[j][c1]) ok = false
                    }
                if (number === 1 && ok === true) {

                    return {
                        line: i,
                        poz: c1
                    }

                }
                number = 0
                ok = true
                for (let j = 0; j < 3; j++)
                    if (matrix[j][c2] === symbol) number++
                    else {
                        if (matrix[j][c2]) ok = false
                    }
                if (number === 1 && ok === true) {

                    return {
                        line: i,
                        poz: c2
                    }


                }


            }

        }
        return null
    }


    //Function to check if there is any way to win/lose the game
    const checkMove = (symbol) => {

        //test each row
        for (let i = 0; i < 3; i++) {

            let vecRow = matrix[i].filter(element => element === symbol)

            if (vecRow.length === 2) {

                if (!matrix[i][0]) {

                    return { line: i, poz: 0 }
                }
                if (!matrix[i][1]) {

                    return { line: i, poz: 1 }
                }
                if (!matrix[i][2]) {

                    return { line: i, poz: 2 }
                }
            }

        }

        //test each column
        for (let i = 0; i < 3; i++) {

            let vecTemp = [matrix[0][i], matrix[1][i], matrix[2][i]]
            let vecColumn = vecTemp.filter(element => element === symbol)

            if (vecColumn.length === 2) {
                if (!matrix[0][i]) {

                    return { line: 0, poz: i }
                }
                if (!matrix[1][i]) {
                    return { line: 1, poz: i }
                }
                if (!matrix[2][i]) {

                    return { line: 2, poz: i }
                }
            }


        }

        //test diagonals
        //principal
        for (let i = 0; i < 2; i++) {
            let rep = 0;
            if (matrix[i][i] === matrix[i + 1][i + 1] && matrix[i][i] === symbol) rep++;
            if (rep === 1) {
                if (!matrix[0][0] && matrix[1][1] !== null && matrix[2][2] != null) {
                    return {
                        line: 0,
                        poz: 0
                    }
                }
                else
                    if (!matrix[1][1] && matrix[0][0] !== null && matrix[2][2] != null) {
                        return {
                            line: 1,
                            poz: 1
                        }
                    }
                    else if (!matrix[2][2]) return {
                        line: 2,
                        poz: 2
                    }
            }

        }

        //secondary
        if (matrix[0][2] === matrix[1][1] || matrix[1][1] === matrix[2][0] || matrix[0][2] === matrix[2][0]) {
            if (!matrix[0][2] && matrix[1][1] === symbol && matrix[2][0] === symbol) {
                return {
                    line: 0,
                    poz: 2
                }
            }
            else
                if (!matrix[1][1] && matrix[0][2] === symbol && matrix[2][0] === symbol) {
                    return {
                        line: 1,
                        poz: 1
                    }
                }
                else if (!matrix[2][0] && matrix[1][1] === symbol && matrix[0][2] === symbol) {

                    return {
                        line: 2,
                        poz: 0
                    }
                }

        }

        return null

    }

    const fillEmpty = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++)
                if (!matrix[i][j])
                    return {
                        line: i,
                        poz: j
                    }
        }
    }


    const cpuMove = () => {


        if (CPUPick === 'X') {
            if (CPUp1 === true) {
                if (matrix[1][1] === null) {
                    updateMatrix(1, 1, CPUPick)
                    updateCPU()


                }
                else {
                    if (matrix[0][0] === CPUPick) {
                        updateMatrix(2, 2, CPUPick)
                        updateCPU()


                    }
                    else
                        if (matrix[0][2] === CPUPick) {
                            updateMatrix(2, 0, CPUPick)
                            updateCPU()


                        }
                        else
                            if (matrix[2][0] === CPUPick) {
                                updateMatrix(0, 2, CPUPick)
                                updateCPU()


                            }
                            else {
                                if (matrix[2][2] === CPUPick) {
                                    updateMatrix(0, 0, CPUPick)
                                    updateCPU()


                                }
                            }

                }
            }

            else {

                if (!winnerGame) {


                    // CHECK IF THERE ARE ANY MOVES FOR CPU TO WIN
                    let a = checkMove(CPUPick)
                    if (a) {

                        const { line, poz } = a
                        updateMatrix(line, poz, CPUPick)
                    }
                    else {
                        a = checkMove(playerPick)
                        if (a) {

                            const { line, poz } = a
                            updateMatrix(line, poz, CPUPick)
                        }
                        else {
                            //check if there are any spots for the CPU to make a triangle to win
                            a = checkT(CPUPick)

                            if (a) {
                                const { line, poz } = a
                                updateMatrix(line, poz, CPUPick)
                            }
                            else {
                                a = checkT(playerPick)

                                if (a) {
                                    const { line, poz } = a
                                    updateMatrix(line, poz, CPUPick)
                                }
                                else {
                                    //find an empty spot
                                    a = fillEmpty()
                                    const { line, poz } = a
                                    updateMatrix(line, poz, CPUPick)

                                }

                            }

                        }


                    }

                }
            }
        }
        else {

            if (CPUp1 === true) {
                if (matrix[1][1] === null) {
                    updateMatrix(1, 1, CPUPick)
                    updateCPU()
                }
                else {
                    let line = Math.floor(Math.random() * 3)
                    let poz = Math.floor(Math.random() * 3)
                    if (line === 1) line--;
                    if (poz === 1) poz--;
                    updateMatrix(line, poz, CPUPick)
                    updateCPU()

                }
            }
            else {
                if (!winnerGame) {
                    if (matrix[1][1] === playerPick) {
                        let a = checkMove(CPUPick)
                        if (a) {

                            const { line, poz } = a
                            updateMatrix(line, poz, CPUPick)
                        }
                        else {
                            a = checkMove(playerPick)
                            if (a) {

                                const { line, poz } = a
                                updateMatrix(line, poz, CPUPick)
                            }
                            else {
                                a = checkT(playerPick)
                                console.log(a)
                                if (a) {
                                    const { line, poz } = a;
                                    if (matrix[2][0] === CPUPick)
                                        updateMatrix(line, poz - 1, CPUPick)
                                    else
                                        if (matrix[2][2] === CPUPick)
                                            updateMatrix(line, poz + 1, CPUPick)
                                        else
                                            if (matrix[0][2] === CPUPick)
                                                updateMatrix(line - 1, poz, CPUPick)
                                            else
                                                if (matrix[0][0] === CPUPick)
                                                    updateMatrix(line - 1, poz, CPUPick)
                                }
                                else {
                                    a = fillEmpty()
                                    if (a) {
                                        const { line, poz } = a
                                        updateMatrix(line, poz, CPUPick)
                                    }
                                }
                            }


                        }

                    }
                    else {
                        let a = checkMove(CPUPick)
                        if (a) {

                            const { line, poz } = a
                            updateMatrix(line, poz, CPUPick)
                        }
                        else {
                            a = checkMove(playerPick)
                            if (a) {

                                const { line, poz } = a
                                updateMatrix(line, poz, CPUPick)
                            }
                            else {
                                if (matrix[0][0] === playerPick && matrix[2][2] === playerPick && matrix[0][1] === null)
                                    updateMatrix(0, 1, CPUPick)
                                else {
                                    if (matrix[0][2] === playerPick && matrix[2][0] === playerPick && matrix[0][1] === null)
                                        updateMatrix(0, 1, CPUPick)
                                    else {
                                        let a = checkT(playerPick)
                                        if (a) {
                                            const { line, poz } = a
                                            updateMatrix(line, poz, CPUPick)
                                        }
                                        else {
                                            a = fillEmpty()
                                            if (a) {
                                                const { line, poz } = a
                                                updateMatrix(line, poz, CPUPick)
                                            }

                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }

        }

    }

    //Function to close the game and announce the winner!
    const closeTheGame = () => {

        //test each row
        for (let i = 0; i < 3; i++) {
            let rep = 0;
            for (let j = 0; j < 2; j++)
                if (matrix[i][j] === matrix[i][j + 1] && matrix[i][j] !== null) rep++;
            if (rep === 2) updateWinner(matrix[i][0])

        }

        //test each column
        for (let i = 0; i < 3; i++) {
            let rep = 0;
            for (let j = 0; j < 2; j++)
                if (matrix[j][i] === matrix[j + 1][i] && matrix[j][i] !== null) rep++;
            if (rep === 2) updateWinner(matrix[0][i])

        }

        //test diagonals
        //principal
        let rep = 0;
        for (let i = 0; i < 2; i++) {

            if (matrix[i][i] === matrix[i + 1][i + 1] && matrix[i][i] !== null) rep++;
            if (rep === 2) {
                updateWinner(matrix[0][0])
            }
        }

        //secondary
        if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[1][1] !== null)
            updateWinner(matrix[1][1])


        //CASE TIE
        let nr = 0;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (matrix[i][j]) nr++;
        if (nr === 9) {
            updateWinner("tie")
        }


    }
    const action = () => {

        //check to see if the spot is empty
        if (!matrix[line][poz]) {

            //if it's empty let's update the matrix with the PlayerPick
            updateMatrix(line, poz, playerPick);
            //refresh the page
            setRefresh(prevState => !prevState)
            closeTheGame()

            //after that it's the time for CPU to make his move
            cpuMove()
            triggerRerender()
            closeTheGame()


        }
    }

    return (
        <div className="box" onClick={action}>
            {matrix[line][poz] &&
                <img src={matrix[line][poz] === "X" ? xIcon : oIcon} alt="icon" />
            }
        </div>
    )
}

export default Box