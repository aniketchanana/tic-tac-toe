import React, { Component } from 'react';
import "./Board.css";
import Cell from './Cell';
class Board extends Component{
    constructor(){
        super();
        let val = [];
        for(let i=0;i<3;i++)
        {
            let valuesarr = [];
            for(let j=0;j<3;j++)
            {
                valuesarr[j] = "";
            }
            val.push(valuesarr);
        }

        //0 means x ki baari hai
        //1 means o ki baari hai
        this.state = {
            values:val,
            turn:0,
            gameOver:-1
        }
        //-1 still playing game
        //0 win
        //1 draw
        this.cellClick = this.cellClick.bind(this);
        this.isWinner = this.isWinner.bind(this);
        this.resetBtn = this.resetBtn.bind(this);
    }
    resetBtn(){
        let val = [];
        for(let i=0;i<3;i++)
        {
            let valuesarr = [];
            for(let j=0;j<3;j++)
            {
                valuesarr[j] = "";
            }
            val.push(valuesarr);
        }
        this.setState({
            values:val,
            turn:0,
            gameOver:-1
        })
    }
    async cellClick(cellno){
        if(this.state.gameOver !== -1)
        return ;
        let x = cellno[0];
        let y = cellno[1];
        let vals = this.state.values;
        vals[x][y] = this.state.turn === 0 ? 'X' : 'O';
        let t = this.state.turn===0?1:0;
        await this.setState({
            values:vals,
            turn:t,
        })

        let gameStatus = this.isWinner(this.state.values);

        await this.setState({
            gameOver:gameStatus
        })
    }
    isWinner(feild){
        // check row wise

        for (let i = 0; i < 3; i++) {
            if (feild[i][0] === feild[i][1] && feild[i][1] === feild[i][2] && feild[i][0] !== "" && feild[i][1] !== "" && feild[i][2] !== "") {
                return 0;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (feild[0][i] === feild[1][i] && feild[1][i] === feild[2][i] &&  feild[0][i] !== "" && feild[1][i] !== "" && feild[2][i] !== "") {
                return 0;
            }
        }
        if (feild[0][0] === feild[1][1] && feild[1][1] === feild[2][2] && feild[0][0] !== "" && feild[1][1] !== "" && feild[2][2] !== "") {
            return 0;
        }
        if (feild[0][2] === feild[1][1] && feild[1][1] === feild[2][0]  && feild[0][2] !== ""  && feild[1][1] !== ""  && feild[2][0] !== "") {
            return 0;
        }

        let count = 0;
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(feild[i][j] !== "")
                count++;
            }
        }

        if(count === 9)
        return 1;

        return -1;
        //-1 still playing game
        //0 win
        //1 draw
    }
    render(){
        let cells = [];
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            cells.push(<Cell value={this.state.values[i][j]} key={`${i}-${j}`} id={`${i}-${j}`} clicked={this.cellClick}/>);
        }

        let winner = <div>
                        <h1 className="winner">{this.state.turn === 0?'O ':"X"} is Winner <button onClick={this.resetBtn} className="btn btn-lg btn-success">Reset</button></h1>
                    </div>
        let draw = <div>
                        <h1 className="winner">Match is Draw <button onClick={this.resetBtn} className="btn btn-lg btn-success">Reset</button></h1>
                    </div>

        let turn = <h1 className="turn">{this.state.turn === 0?"Turn of X":"Turn of O"}</h1>

        return (
            <center><div>
                {this.state.gameOver === 0 || this.state.gameOver === 1 ? this.state.gameOver === 0? winner:draw : turn}
                
                <div className="boardContainer">
                    <div className="board">
                        {cells}
                    </div>
                </div>
            </div></center>
        );
    }
}

export default Board;