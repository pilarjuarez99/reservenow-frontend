import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar el producto');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail">
      <header className="detail-header">
        <h2>{product.name}</h2>
        <button onClick={() => navigate(-1)}>← Volver</button>
      </header>
      <section className="detail-body">
        <p>{product.description}</p>
        <div className="image-container">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
          />
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
