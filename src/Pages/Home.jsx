import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar recomendaciones aleatorias al cargar la página
    fetch('http://localhost:8080/api/products/random')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  // Función para buscar productos con el texto del input
  const handleSearch = () => {
    if (searchText.trim() === '') {
      setSearchResults(null);
      return;
    }

     fetch(`http://localhost:8080/api/products/search?text=${encodeURIComponent(searchText)}`)
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

  // Para que al presionar Enter también busque
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="home-main">
      {/* Buscador */}
      <section className="buscador">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="buscador-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="buscador-boton">Buscar</button>
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

      {/* Resultados o recomendaciones */}
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