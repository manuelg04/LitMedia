/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
export default function CustomTooltip({ active, payload }) {
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
  