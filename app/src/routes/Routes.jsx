import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Importa tus páginas
import { Header } from "../features/layout/components/Header";
import { Footer } from "../features/layout/components/Footer";
import { Content } from "../features/layout/components/Content";
import { ApiRyC } from "../features/apis/components/ApiRyC";
import { Perfil } from "../features/auth/components/perfil";
import { Login } from "../features/auth/components/Login";
import { Register } from "../features/auth/components/register";
import { ForgotPassword } from "../features/auth/components/forgotPassword";
import { ApiRyCi } from "../features/apis/components/apiRyC_axios";
// 🔥 Se eliminó la importación de Conocenos
import { Dashboard } from "../features/dashboard/components/dashboard";

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/ApiRyC" element={<ApiRyC />} />
        <Route path="/ApiRyC_axios" element={<ApiRyCi />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* 🔥 Se eliminó la ruta de /conocenos */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </HashRouter>
  );
};