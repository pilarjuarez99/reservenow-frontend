import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import AdminPanel from './Pages/AdminPanel';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import Categoria from './Pages/Categoria';

import Login from './Pages/Login';
import Register from './Pages/Register';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main style={{ paddingTop: '60px', minHeight: 'calc(100vh - 120px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/categoria/:nombre" element={<Categoria />} />

            {/* Rutas protegidas solo para admin */}
            <Route path="/administracion" element={
              <PrivateRoute requiredRole="ROLE_ADMIN">
                <AdminPanel />
              </PrivateRoute>
            } />
            <Route path="/admin/lista" element={
              <PrivateRoute requiredRole="ROLE_ADMIN">
                <ProductList />
              </PrivateRoute>
            } />
            <Route path="/admin/agregar" element={
              <PrivateRoute requiredRole="ROLE_ADMIN">
                <AddProduct />
              </PrivateRoute>
            } />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;