import { StrictMode } from 'react'
//searches the HTML element with the id="root" and creates the react app inside
import { createRoot } from 'react-dom/client'
//tools for the routes
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//global CSS for the app, mostly to allow tailwind to work
import './index.css'

//pages for the router
import Navbar from './routes/Navbar.tsx'
import GamesCard from "./routes/gamesCard.tsx"
import AddGame from "./routes/AddGame.tsx"
import GamePage from "./routes/GamePage.tsx";
import NotFound from "./routes/NotFound.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";

//defines the routes for the app
const router = createBrowserRouter([
  {
    // Base route, all other routes render inside Outlet
    path: "/",
    element: <Navbar />,
    // Page for crashes
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
        //page for unexistent URL
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
