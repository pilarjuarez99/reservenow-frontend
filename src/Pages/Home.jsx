import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    fetch('http://localhost:8080/api/products/random')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === '' && !startDate && !endDate) {
      setSearchResults(null);
      return;
    }

    const queryParams = new URLSearchParams();
    if (searchText.trim()) queryParams.append('text', searchText);
    if (startDate) queryParams.append('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) queryParams.append('endDate', endDate.toISOString().split('T')[0]);

    fetch(`http://localhost:8080/api/products/search?${queryParams}`)
      .then(res => {
        if (!res.ok) throw new Error('Error en la búsqueda');
        return res.json();
      })
      .then(data => setSearchResults(data))
      .catch(error => {
        console.error('Error en búsqueda:', error);
        setSearchResults([]);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleFavorite = (productId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
    // Aquí iría la lógica para guardar favoritos en el backend si aplica
  };

  const handleAutocomplete = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length > 2) {
      fetch(`http://localhost:8080/api/products/autocomplete?text=${encodeURIComponent(value)}`)
        .then(res => res.json())
        .then(data => setSearchSuggestions(data))
        .catch(() => setSearchSuggestions([]));
    } else {
      setSearchSuggestions([]);
    }
  };

  return (
    <main className="home-main">
      {/* Bloque Buscador */}
      <section className="buscador">
        <h1 className="buscador-titulo">Buscá tu próxima experiencia</h1>
        <p className="buscador-descripcion">Filtrá por palabra clave y por rango de fechas</p>

        <div className="buscador-campos">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="buscador-input"
            value={searchText}
            onChange={handleAutocomplete}
            onKeyDown={handleKeyDown}
          />
          {searchSuggestions.length > 0 && (
            <ul className="sugerencias-autocompletar">
              {searchSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => {
                  setSearchText(suggestion);
                  setSearchSuggestions([]);
                }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className="buscador-fechas">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Desde"
              className="date-picker"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Hasta"
              className="date-picker"
            />
          </div>
          <button onClick={handleSearch} className="buscador-boton">Realizar búsqueda</button>
        </div>
      </section>

      {/* Categorías */}
      <section className="categorias">
        <h2>Categorías</h2>
        <div className="categoria-lista">
          <Link to="/categoria/Turismo" className="categoria">Turismo</Link>
          <Link to="/categoria/Aventura" className="categoria">Aventura</Link>
          <Link to="/categoria/Cultural" className="categoria">Cultural</Link>
        </div>
      </section>

      {/* Recomendaciones o Resultados */}
      <section className="recomendaciones">
        <h2>{searchResults !== null ? `Resultados para "${searchText}"` : 'Recomendaciones'}</h2>
        <div className="product-grid">
          {(searchResults !== null ? searchResults : products).length > 0 ? (
            (searchResults !== null ? searchResults : products).map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imagenUrl} alt={product.titulo} />
                <h3>{product.titulo}</h3>
                <p>{product.descripcion}</p>
                <Link to={`/producto/${product.id}`} className="ver-mas-link">
                  Ver más
                </Link>

                {isAuthenticated && (
                  <button
                    className={`fav-button ${favorites.includes(product.id) ? 'activo' : ''}`}
                    onClick={() => handleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? '★ Favorito' : '☆ Marcar favorito'}
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;