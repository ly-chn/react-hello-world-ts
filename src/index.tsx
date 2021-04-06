import React from "react"
import ReactDOM from "react-dom"
import './index.css'
import Board from "./board";

interface StateHistory {
    squares: Array<string | null>
}

interface State {
    history: Array<StateHistory>,
    nextPlayer: string,
    winner: string | null,
    stepNumber: number
}

class Game extends React.Component {
    state: State = {
        history: [{
            squares: new Array(9).fill(null),
        }],
        nextPlayer: 'X',
        winner: null,
        stepNumber: 0
    }

    render() {
        const {nextPlayer, winner, stepNumber,history} = {...this.state}
        const current = history[stepNumber]
        const status = winner ? `winner is: ${winner}` : `Next player: ${nextPlayer}`

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start'
            return (<li>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>);
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={i => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }

    handleClick(i: number) {
        let {history, nextPlayer, winner, stepNumber} = {...this.state}
        history = history.slice(0, stepNumber + 1)
        // game over
        if (winner) {
            return
        }

        const current = history[stepNumber]
        const squares = current.squares.slice()
        if (squares[i]) {
            return
        }
        squares[i] = nextPlayer
        nextPlayer = nextPlayer === 'X' ? 'O' : 'X'
        winner = this.calculateWinner(squares)

        this.setState({
            history: history.concat([{squares: squares}]),
            winner,
            nextPlayer,
            stepNumber: history.length
        });
    }

    calculateWinner(squares: Array<string | null>) {
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
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    jumpTo(step: number) {
        const history = this.state.history.slice();
        this.setState({
            stepNumber: step,
            nextPlayer: (step % 2) === 0 ? 'X' : 'O',
            // 重新计算胜者
            winner: this.calculateWinner(history[step].squares),
        });
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)
