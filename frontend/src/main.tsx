import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Navbar from './routes/Navbar.tsx'
import GamesCard from "./routes/gamesCard.tsx"
import AddGame from "./routes/AddGame.tsx"
import GamePage from "./routes/GamePage.tsx";
import NotFound from "./routes/NotFound.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <GamesCard />
      },
      {
        path: "add-game",
        element: <AddGame />
      },
      {
        path: "game/:id",
        element: <GamePage />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
    

},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
