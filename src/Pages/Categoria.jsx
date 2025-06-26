import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Pages/Home.css';

function Categoria() {
  const { nombre } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!nombre) return;

    fetch(`http://localhost:8080/api/products/categoria/${encodeURIComponent(nombre)}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos por categoría');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error al cargar productos por categoría:', error);
        setProducts([]);
      });
  }, [nombre]);

  return (
    <main className="home-main">
      <h2>Productos de la categoría: {nombre}</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imagenUrl} alt={product.titulo} />
              <h3>{product.titulo}</h3>
              <p>{product.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay productos para esta categoría.</p>
        )}
      </div>
    </main>
  );
}

export default Categoria;
