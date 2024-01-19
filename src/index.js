import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { default as RootPage } from "./App";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

import TokenService from "./db/token";
import AuthService, { AuthErrorEventBus } from "./service/auth";
import TweetService from "./service/tweet";
import { AuthProvider } from "./context/AuthApiContext";
import { TweetApiProvider } from "./context/TweetApiContext";
import HTTPService from "./network/http";
import SocketIOService from "./network/socket";

const baseURL = process.env.REACT_APP_BaseURL;

const authErrorEventBus = new AuthErrorEventBus();
const http = new HTTPService(baseURL, authErrorEventBus);
const tokenService = new TokenService();
const authService = new AuthService(http, tokenService);
const socketService = new SocketIOService(baseURL);
const tweetService = new TweetService(http, tokenService, socketService);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: ":userId",
        element: <MyPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

// <React.StrictMode>
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
    <TweetApiProvider tweetService={tweetService}>
      <RouterProvider router={router} />
    </TweetApiProvider>
  </AuthProvider>
);
