import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmado = window.confirm('¿Estás seguro que deseas eliminar este producto?');
    if (!confirmado) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProductos();
    } catch (err) {
      alert('Error al eliminar el producto');
    }
  };

  return (
    <div className="productlist-container">
      <h2>Lista de Productos</h2>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && productos.length === 0 && <p>No hay productos para mostrar.</p>}

      {!loading && productos.length > 0 && (
        <table className="productlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.titulo} className="product-thumb" />
                  ) : (
                    'Sin imagen'
                  )}
                </td>
                <td>{p.titulo}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/admin/editar/${p.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => eliminarProducto(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;