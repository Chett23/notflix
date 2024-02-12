import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Home, homeLoader } from "./pages/Home";
import { Movies, moviesLoader } from "./pages/Movies";
import { TVShows, showsLoader } from "./pages/TVShows";
import { MediaPage, mediaPageLoader } from "./pages/MediaPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/movies",
        element: <Movies />,
        loader: moviesLoader,
      },
      {
        path: "/shows",
        element: <TVShows />,
        loader: showsLoader,
      },
      {
        path: "/:media_type/:media_id",
        element: <MediaPage />,
        loader: mediaPageLoader
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
