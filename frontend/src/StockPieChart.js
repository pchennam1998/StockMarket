import React from 'react';
import {PieChart, Pie, Sector, Tooltip, Cell, ResponsiveContainer} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#21618C', '#F4D03F'];

const RADIAN = Math.PI / 180;

export class StockPieChart extends React.Component{

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {this.props.data[index].title +":"}{`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render () {
    return (

        <PieChart onMouseEnter={this.onPieEnter} width ={800} height={700}>
          <Pie
            data={this.props.data}
            cx={450}
            cy={350}
            labelLine={false}
            label={this.renderCustomizedLabel}
            outerRadius={300}
            fill="#8884d8"
          >
            {
              this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip/>
        </PieChart>
 
    );
  }
}
