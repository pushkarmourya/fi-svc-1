import React from 'react'
import get from 'lodash/get'
import { strings } from '../../constants/Strings'

const TableComponent = ({ chartData }) => {
  return (
    <div className="chart-data-table">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={headerStyle}>{strings.categoryId}</th>
            <th style={headerStyle}>{strings.name}</th>
            <th style={headerStyle}>{strings.color}</th>
            <th style={headerStyle}>{strings.totalAmount}</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((item) => (
            <tr key={item.category_id}>
              <td style={cellStyle}>{item.category_id}</td>
              <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: item.color,
                  }}
                ></div>
              </td>
              <td style={cellStyle}>Rs. {get(item, 'sum', 0) || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const headerStyle = {
  backgroundColor: '#f2f2f2',
  color: '#333',
  padding: '8px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
}

const cellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ddd',
}

export default TableComponent
