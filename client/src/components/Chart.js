import React from 'react'
import { VictoryTheme, VictoryScatter, VictoryChart, VictoryZoomContainer } from 'victory'
import { ResponsiveContainer } from 'recharts';


const Chart = ({ name, data, xDataKey, yDataKey, stroke, fill }) => {
    console.log("Chart: ", data)
    let formattedData = []
    data.forEach(element => {
        formattedData.push({
            "x": element.X,
            "y": element.Y
        })
    });
    console.log("formattedData:", formattedData)
    return <div>
        <h1>{name}</h1>
        <div className="row">

            <ResponsiveContainer width="99%" aspect={3}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domain={{ x: [-1, 2], y: [-1, 2] }}
                    containerComponent={<VictoryZoomContainer zoomDomain={{ x: [-1, 2], y: [-1, 2] }} />}
                >
                    <VictoryScatter
                        style={{ data: { fill: fill, stroke: stroke } }}
                        size={7}
                        data={formattedData}
                        xDataKey={xDataKey}
                        yDataKey={yDataKey}
                    />
                </VictoryChart>
            </ResponsiveContainer>
        </div>
    </div>
}

export default Chart