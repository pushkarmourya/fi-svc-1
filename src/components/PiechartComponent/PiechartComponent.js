import React from 'react'
import { Pie } from 'react-chartjs-2'
import { strings } from '../../constants/Strings'

const PiechartComponent = ({chartData}) => {

  return (
    <div className="pie-chart">
      <h2>{strings.pieChartHeader}</h2>
      <Pie data={chartData} />
    </div>
  )
}

export default PiechartComponent
