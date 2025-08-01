import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Reserva.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Reserva = () => {
  const { id } = useParams(); // ID del producto a reservar
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validaciones básicas
    if (!startDate || !endDate) {
      setMessage('Por favor completa todos los campos correctamente.');
      return;
    }

    if (!token) {
      setMessage('Debes iniciar sesión para realizar una reserva.');
      return;
    }

    try {
      const reservaPayload = {
        product: { id: parseInt(id) },
        fechaInicio: startDate.toISOString(),
        fechaFin: endDate.toISOString(),
      };

      const response = await axios.post(
        'http://localhost:8080/reservas',
        reservaPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage('Reserva confirmada con éxito!');
        setTimeout(() => navigate('/'), 2500);
      } else {
        setMessage('Error al confirmar la reserva.');
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data || 'No se pudo procesar la reserva.'}`);
      } else {
        setMessage('Ocurrió un error al enviar la reserva.');
      }
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

        <button type="submit">Confirmar reserva</button>

        {message && <p className="reserva-message">{message}</p>}
      </form>
    </div>
  );
};

export default Reserva;