import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ProductDetail.css';
import { FaStar } from 'react-icons/fa';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const isAuthenticated = localStorage.getItem('authToken') !== null;

  useEffect(() => {
    // Traer producto
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el producto');
        setLoading(false);
      });

    // Simulación: fechas reservadas
    setDisabledDates([
      new Date('2025-07-10'),
      new Date('2025-07-11'),
      new Date('2025-07-12'),
    ]);

    // Simulación: traer reseñas
    setReviews([
      { user: 'Lucía', stars: 4, date: '2025-06-01', comment: 'Muy buen producto' },
      { user: 'Pedro', stars: 5, date: '2025-06-20', comment: 'Lo disfrutamos mucho' },
    ]);
  }, [id]);

  const handleRatingSubmit = () => {
    if (!rating) return;
    const newReview = {
      user: 'Tú',
      stars: rating,
      date: new Date().toISOString().split('T')[0],
      comment,
    };
    setReviews(prev => [newReview, ...prev]);
    setRating(0);
    setComment('');
  };

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
        <img src={product.imageUrl} alt={product.name} className="detail-image" />
        <p>{product.description}</p>

        <button
          onClick={() => navigate(`/reserva/${product.id}`)}
          className="btn-reservar"
        >
          Reservar ahora
        </button>

        {/* Disponibilidad */}
        <h3>Disponibilidad</h3>
        <div className="calendar-range">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            excludeDates={disabledDates}
            placeholderText="Fecha inicio"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            excludeDates={disabledDates}
            placeholderText="Fecha fin"
          />
        </div>

        {/* Políticas */}
        <section className="politicas">
          <h3 className="politicas-titulo">Políticas del Producto</h3>
          <div className="politicas-columnas">
            <div>
              <h4>Condiciones de uso</h4>
              <p>No se permite fumar ni llevar mascotas.</p>
            </div>
            <div>
              <h4>Cancelaciones</h4>
              <p>Cancelaciones gratis hasta 7 días antes.</p>
            </div>
            <div>
              <h4>Seguridad</h4>
              <p>El lugar cuenta con cámaras y alarma.</p>
            </div>
          </div>
        </section>

        {/* Compartir */}
        <div className="compartir">
          <button onClick={() => setShowShare(true)}>Compartir</button>
          {showShare && (
            <div className="modal">
              <h4>Compartir este producto</h4>
              <img src={product.imageUrl} alt="mini" />
              <p>{product.description}</p>
              <FacebookShareButton url={window.location.href}><button>Facebook</button></FacebookShareButton>
              <TwitterShareButton url={window.location.href}><button>Twitter</button></TwitterShareButton>
              <button onClick={() => setShowShare(false)}>Cerrar</button>
            </div>
          )}
        </div>

        {/* Mapa */}
        <section className="mapa">
          <h3>Ubicación</h3>
          <iframe
            title="mapa"
            src="https://www.google.com/maps?q=Charcas+%26+Thames,+Buenos+Aires&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
          />
        </section>

        {/* Puntuar */}
        {isAuthenticated && (
          <section className="valoracion">
            <h3>Tu reseña</h3>
            <div className="estrellas">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < rating ? '#ffc107' : '#e4e5e9'}
                  onClick={() => setRating(i + 1)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <textarea
              placeholder="Tu comentario..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button onClick={handleRatingSubmit}>Enviar reseña</button>
          </section>
        )}

        {/* Reseñas */}
        <section className="reseñas">
          <h3>Reseñas</h3>
          {reviews.length === 0 ? (
            <p>Aún no hay reseñas.</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="reseña">
                <div className="estrellas">
                  {[...Array(r.stars)].map((_, j) => (
                    <FaStar key={j} color="#ffc107" />
                  ))}
                </div>
                <p><strong>{r.user}</strong> - {r.date}</p>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </section>
      </section>
    </div>
  );
};

export default ProductDetail;
