/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Leer es resistir', comments: 220, discussions: 120 },
  { name: 'Cien años de soledad', comments: 180, discussions: 100 },
  { name: 'Amor y odio', comments: 240, discussions: 130 },
  { name: 'El principito', comments: 260, discussions: 150 },
  { name: 'Matar a un ruiseñor', comments: 200, discussions: 110 }
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p>{`Libro: ${payload[0].payload.name}`}</p>
        <p>{`Comentarios: ${payload[0].value}`}</p>
        <p>{`Discusiones: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
}

function BookDiscussionChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis textAnchor="end" height={60} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="comments" name="Comentarios" fill="#8884d8" />
        <Bar dataKey="discussions" name="Discusiones" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BookDiscussionChart;
