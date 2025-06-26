import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Reserva.css';
import axios from 'axios';

const Reserva = () => {
  const { id } = useParams(); // ID del producto a reservar
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [people, setPeople] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || people < 1) {
      setMessage('Por favor completa todos los campos correctamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/reservations', {
        productId: id,
        startDate,
        endDate,
        people,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage('Reserva confirmada con éxito!');
        setTimeout(() => navigate('/'), 2500);
      } else {
        setMessage('Error al confirmar la reserva.');
      }
    } catch (error) {
      setMessage('Ocurrió un error al enviar la reserva.');
      console.error(error);
    }
  };

  return (
    <div className="reserva-container">
      <h2>Reservar</h2>
      <form onSubmit={handleSubmit} className="reserva-form">
        <label>Fecha de inicio:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Selecciona la fecha de inicio"
        />

        <label>Fecha de fin:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()}
          placeholderText="Selecciona la fecha de fin"
        />

        <label>Cantidad de personas:</label>
        <input
          type="number"
          value={people}
          min="1"
          onChange={(e) => setPeople(parseInt(e.target.value))}
        />

        <button type="submit">Confirmar reserva</button>

        {message && <p className="reserva-message">{message}</p>}
      </form>
    </div>
  );
};

export default Reserva;