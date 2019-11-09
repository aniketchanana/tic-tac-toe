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
        let x = cellno[0];
        let y = cellno[1];
        let vals = this.state.values;
        vals[x][y] = this.state.turn === 0 ? 'X' : 'O';
        let t = this.state.turn===0?1:0;
        await this.setState({
            values:vals,
            turn:t,
        })
        let win = this.isWinner(this.state.values);
        await this.setState({
            gameOver:win
        })
    }
    isWinner(values){
        for(let i=0;i<3;i++)
        {
            if(values[i][0] === values[i][1] && values[i][1] === values[i][2] && values[i][0]!=='' && values[i][1]!=='' && values[i][2]!=='')
            {
                console.log("row")
                return 0;
            }
        }
        for(let i=0;i<3;i++)
        {
            if(values[0][i] === values[1][i] && values[1][i] === values[2][i] && values[0][i]!=='' && values[1][i]!=='' && values[2][i]!=='')
            {
                console.log("col")
                return 0;
            }
        }
        if(values[0][0] === values[1][1] && values[1][1] === values[2][2] && values[0][0] !== '' && values[1][1] !== '' && values[2][2] !== '')
        {
            console.log("diagnol")
            return 0;
        }
        if(values[0][2] === values[1][1] && values[1][1] === values[2][0] && values[0][2] !== '' && values[1][1] !== '' && values[2][1] !== '')
        {
            console.log("diagnol")
            return 0;
        }
        let count = 0;
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                if(values[i][j] !== '')
                count++;
            }
        }
        //draw
        if(count === 9)
        return 1;
        return -1;
    }
    render(){
        let cells = [];
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            cells.push(<Cell value={this.state.values[i][j]} key={`${i}-${j}`} id={`${i}-${j}`} clicked={this.cellClick}/>);
        }
        if(this.state.gameOver===-1)
        return (
            <div><h1 className="turn">{this.state.turn === 0?"Turn of X":"Turn of O"}</h1>
        <div className="board">
            {cells}
        </div></div>
        );
        else if(this.state.gameOver === 0)
        {
            return (
                <div>
                    <h1 className="winner">{this.state.turn === 0?'O ':"X"} is Winner</h1>
                    <br/>
                    <button onClick={this.resetBtn} className="btn btn-lg btn-success">Reset</button>
                </div>
            )
        }
        else if(this.state.gameOver === 1){
            return (
                <div>
                    <h1 className="winner">Match is Draw</h1>
                    <br/>
                    <button onClick={this.resetBtn} className="btn btn-lg btn-success">Reset</button>
                </div>
            )
        }
    }
}

export default Board;