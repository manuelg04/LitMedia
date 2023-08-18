import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Leer es resistir', comments: 220, discussions: 120 },
  { name: 'Cien años de soledad', comments: 180, discussions: 100 },
  { name: 'Amor y odio', comments: 240, discussions: 130 },
  { name: 'El principito', comments: 260, discussions: 150 },
  { name: 'Matar a un ruiseñor', comments: 200, discussions: 110 }
];

function BookDiscussionChart() {
  return (
    <BarChart
      width={700}
      height={400}
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="comments" name="Comentarios" fill="#8884d8" />
      <Bar dataKey="discussions" name="Discusiones" fill="#82ca9d" />
    </BarChart>
  );
}

export default BookDiscussionChart;
