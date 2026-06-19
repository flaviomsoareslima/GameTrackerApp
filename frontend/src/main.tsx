import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Navbar from './routes/Navbar.tsx'
import GamesCard from "./routes/gamesCard.tsx"
import AddGame from "./routes/AddGame.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <GamesCard />
      },
      {
        path: "add-game",
        element: <AddGame />
      }
    ],

},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
