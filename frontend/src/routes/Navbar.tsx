
// Link allows page navigation without reloading the page
//Outlet allows child pages to be rendered inside another page
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";


//this is the navbar that the app uses all the time
//this page is where all the other pages and components are rendered in, making this page the base page
function Navbar() {

  return (
    <>
      <nav className="bg-[#101D25]">
        <div className="flex w-full flex-col md:items-center gap-4 px-4 py-4 md:flex-row md:gap-8 md:px-8">
          {/* Clicking the logo returns the base URL, cleaning all searches */}
          <Link
            to="/"
            className="shrink-0 text-2xl leading-none text-[#A1D9FF]"
          >
            GameTracker
          </Link>
          {/* Search bar component is rendered here */}
          <div className="w-full md:min-w-64 md:flex-1">
            <SearchBar />
          </div>
          {/* Navigation links that change the URL to query the DB for the most common searches */}
          <div className="flex flex-wrap flex-col md:flex-row items-center gap-2 md:shrink-0 md:gap-4 text-[#A1D9FF]">
            <Link
              to="/?filter=library"
              className="rounded-lg px-4 py-3 leading-none hover:bg-[#a1d9ff6b]"
            >
              Library
            </Link>

            <Link
              to="/?filter=favorites"
              className="rounded-lg px-4 py-3 leading-none hover:bg-[#a1d9ff6b]"
            >
              Favorites
            </Link>
            {/* Opens a menu to add a new game to the DB */}
            <Link
              to="/add-game"
              className="rounded-lg px-4 py-3 leading-none hover:bg-[#a1d9ff6b]"
            >
              Add Game
            </Link>
          </div>
        </div>

      </nav>
      {/* All childpages are rendered here */}
      <Outlet />
    </>
  );
}


export default Navbar;
