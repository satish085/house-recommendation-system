import React, { useContext } from 'react'
import { DimensionContext } from '../../store/DimensionContext';
import './style.css'

const Instructions = () => {
    const { updateInst } = useContext(DimensionContext);
    return (
        <div className='instruction'>
            <div className='box'>
                <div className='title'>Read the instructions to customize the layout.</div>
                <div>
                    The layout may consists of house,restaurant,gym and hospital.
                </div>
                <div className='plot' >
                    <div>
                        <div style={{ backgroundColor: "red", width: "10px", height: "10px" }}></div> <div> represents house.</div>
                    </div>
                    <div>
                        <div style={{ backgroundColor: "blue", width: "10px", height: "10px" }}></div> represents restaurant.
                    </div>
                    <div>
                        <div style={{ backgroundColor: "yellow", width: "10px", height: "10px" }}></div> represents gym.
                    </div>
                    <div>
                        <div style={{ backgroundColor: "white", width: "10px", height: "10px" }}></div> represents hospital.
                    </div>
                </div>
                <div className='ins'>
                    <div><strong>Follow the below instructions to add plots:</strong></div>

                    <div>1.Click on the plot a pop up with these four options will be visible</div>
                    <div>2.Select any one of the option and it will be updated in the layout</div>
                    <div>3.Click on Set button to set the plot or Click on close to close the popup</div>
                </div>



                <button className='btni' onClick={() => { updateInst(); }} >Close</button>

            </div>
        </div>
    )
}

export default Instructions