import React, { useContext } from 'react'
import { DimensionContext } from '../../store/DimensionContext';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Home = () => {
    const { rows, cols, updateRow, updateCol, createLayout } = useContext(DimensionContext);
    const navigate = useNavigate();
    return (
        <div className='home'>
            <div className='title'>
                <h1>Choose the better house from the layout.</h1>
            </div>
            <div className='create-layout'>
                <div>
                    <div style={{ textAlign: "center" }}><strong>Enter the rows in the layout.</strong></div>
                    <input onChange={(e) => updateCol(e.target.value)} type="text" />

                    <div style={{ textAlign: "center" }}><strong>Enter the columns in the layout.</strong></div>
                    <input onChange={(e) => updateRow(e.target.value)} type="text" />



                </div>
                <button onClick={() => { createLayout(); navigate('/layout') }}>Create Layout</button>
            </div>
        </div>
    )
}

export default Home;