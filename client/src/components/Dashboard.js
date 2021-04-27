import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import Card from './Card'
import Chart from './Chart'

const socket = io('http://localhost:5000')

let x = 0.0;
let y = 0.0;

const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        socket.on('payload', payload => {
            console.log(payload)

            setData(currentData => [...currentData, payload])
            console.log(payload)
            x = payload.X;
            y = payload.Y;
        })
    }, [])
    /*     if (data.length > 10) {
            console.log("data: ", data)
            data.shift()
        } */

    return <div>
        <h1 className="title">10. csapat</h1>
        <div className="card-container">
            <Card name="X" icon="fas fa-map-marker-alt fa-2x" value={x} />
            <Card name="Y" icon="fas fa-map-marker-alt fa-2x" value={y} />
        </div>
        <div className="chart-container">
            <Chart name="Position" data={data} xDataKey="X" yDataKey="Y" stroke="#8884d8"
                fill="#8884d8" />
        </div>
    </div>
}

export default Dashboard
