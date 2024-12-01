import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { DimensionContext } from '../../store/DimensionContext'
import './style.css'

const Result = () => {
    const { layout, result, updateInst, updateResult, updateVal } = useContext(DimensionContext);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }
    return (<div className='result'>
        <div className='output'>
            <div style={{ width: "20px", height: "20px", backgroundColor: "black" }}></div> <div>represents the recommended house for this layout.
            </div>
        </div>
        <div className='plots'>
            {
                layout.map((row, i) => {
                    return <div className='row' key={i}>
                        {
                            row?.map((col, j) => {
                                return <div className='col' key={j}>
                                    <div style={{ borderRadius: "5px", cursor: "pointer", margin: "2px", width: `50px`, height: `30px`, backgroundColor: layout[i][j] == -1 ? "green" : layout[i][j] == 1 ? result.row == j && result.col == i ? "black" : "red" : layout[i][j] == 2 ? "blue" : layout[i][j] == 3 ? "yellow" : "white" }} onClick={() => handleClick(i, j)}>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
        <button className='btnr' onClick={() => handleClick()}>Try Another Layout</button>
    </div>)
}

export default Result;
