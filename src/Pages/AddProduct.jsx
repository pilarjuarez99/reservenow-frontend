import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !imageUrl.trim()) {
      setError('Por favor completa todos los campos');
      setSuccess('');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/products', {
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess('Producto agregado correctamente');
        setError('');
        setName('');
        setDescription('');
        setImageUrl('');
        navigate('/admin/lista');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError('Error al agregar producto');
      }
      setSuccess('');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="add-product-form" noValidate>
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
          autoComplete="off"
        />

        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del producto"
          rows={4}
        />

        <label htmlFor="imageUrl">URL de Imagen:</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL de la imagen del producto"
          autoComplete="off"
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-button">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;