import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Instructions from '../../components/Instructions/Instructions';
import PopUp from '../../components/PopUp/PopUp';
import { DimensionContext } from '../../store/DimensionContext'
import './style.css'

const Layout = () => {
    const { layout, result, inst, updateInst, status, updateStatus, rows, cols, updateResult, updateVal, updateRowIdx, updateColIdx } = useContext(DimensionContext);
    const navigate = useNavigate();
    const handleClick = (i, j) => {
        updateStatus();
        updateRowIdx(i);
        updateColIdx(j);
    }

    const findNearestService = (r, c, val) => {
        let n = rows;
        let m = cols;
        let visited = new Array(n);
        for (let i = 0; i < n; i++) {
            visited[i] = new Array(m);
            for (let j = 0; j < m; j++) {
                visited[i][j] = false;
            }
        }
        var queue = [];
        queue.push({ row: r, col: c, dist: 0 });
        visited[r][c] = true;
        while (queue.length > 0) {
            let obj = queue.shift();
            let a = obj.row;
            let b = obj.col;
            let d = obj.dist;
            if (layout[a][b] == val) {
                return d;
            }
            if (obj.row - 1 >= 0 && visited[obj.row - 1][obj.col] == false) {
                queue.push({ row: a - 1, col: b, dist: d + 1 });
                visited[a - 1][b] = true;
            }
            if (a + 1 < n && visited[a + 1][b] == false) {
                queue.push({ row: a + 1, col: b, dist: d + 1 });
                visited[a + 1][b] = true;
            }
            if (b - 1 >= 0 && visited[a][b - 1] == false) {
                queue.push({ row: a, col: b - 1, dist: d + 1 });
                visited[a][b - 1] = true;
            }
            if (b + 1 < m && visited[a][b + 1] == false) {
                queue.push({ row: a, col: b + 1, dist: d + 1 });
                visited[a][b + 1] = true;
            }

        }
        return 0;
    }

    const findBestHouse = () => {
        let n = rows;
        let m = cols;
        let ans = Number.MAX_VALUE;
        let res;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (layout[i][j] == 1) {
                    let nearestRestaurant = findNearestService(i, j, 2);
                    let nearestGym = findNearestService(i, j, 3);
                    let nearestHospital = findNearestService(i, j, 4);
                    let totalDist = nearestRestaurant + nearestGym + nearestHospital;
                    if (ans > totalDist) {
                        ans = totalDist;
                        res = { row: j, col: i };
                    }
                }
            }
        }
        return res;
    }

    const handleFetch = () => {
        updateResult(findBestHouse());
        console.log(result);
        navigate('/result');
    }



    return (
        <div className='layout'>
            <h1>Get the best house from the layout</h1>
            <button className='btn' style={{ backgroundColor: "red" }} onClick={() => updateInst()}>Read Instructions</button>
            <div className='plots'>
                {
                    layout.map((row, i) => {
                        return <div className='row' key={i}>
                            {
                                row?.map((col, j) => {
                                    return <div className='col' key={j}>
                                        <div style={{ borderRadius: "5px", cursor: "pointer", margin: "2px", width: `50px`, height: `30px`, backgroundColor: layout[i][j] == -1 ? "green" : layout[i][j] == 1 ? "red" : layout[i][j] == 2 ? "blue" : layout[i][j] == 3 ? "yellow" : "white" }} onClick={() => handleClick(i, j)}>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
            {status && <PopUp />}
            {inst && <Instructions />}
            <button className='btn' onClick={() => { handleFetch() }}>Fetch the Best House</button>

        </div>
    )
}

export default Layout