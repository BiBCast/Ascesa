import { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Home } from "../pages/Home/Home";
import { GET_USER } from "../../query";

// Definisci la tua query GraphQL

const AuthGuard = ({ component }: { component: JSX.Element }) => {
  // Recupera il token (ad esempio da localStorage o Redux store)
  const location = useLocation();

  const userId: string = location.state?.user;
  const password: string = location.state?.password;
  console.log(" userId: " + userId);

  // Usa l'hook useQuery per fare la chiamata GraphQL
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { user: userId, password: password },
    //skip: !userId, // Salta la query se non c'è il token
  });

  // Controlla se la query è in caricamento
  if (loading) return <div>Loading...</div>;

  // Gestione degli errori
  if (error) console.error(error);

  // Se il token è valido, mostra Outlet, altrimenti naviga al login
  const isAuthenticated = data?.User;
  const UserId = data?.User.id;
  console.log("isAuthenticated : " + isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/" />;

  if (isAuthenticated && location.pathname === "/home")
    return <Home UserId={UserId} />;
  return component;
};

export default AuthGuard;
