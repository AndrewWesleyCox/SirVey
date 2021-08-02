
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import './Chart.css';

function BinaryChart ({results_data}) { 
    return (
    
        <div className="chart">
            <ResponsiveBar
                data={results_data}
                keys={["value"]}
                indexBy="name"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                borderColor="inherit:darker(1.6)"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Options',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Votes',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="inherit:darker(1.6)"
            />
        </div>
    )
}

export default BinaryChart