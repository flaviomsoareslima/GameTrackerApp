
import { Link, Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";



function Navbar() {

  return (
    <>
      <nav className="bg-[#101D25]">
        <div className="flex w-full items-center gap-8 px-8 py-4">
          <h1 className="shrink-0 text-2xl leading-none text-[#A1D9FF]">
            GameTracker
          </h1>

          <div className="min-w-64 flex-1">
            <SearchBar />
          </div>

          <div className="flex shrink-0 flex-row items-center gap-4 text-[#A1D9FF]">
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

            <Link
              to="/add-game"
              className="rounded-lg px-4 py-3 leading-none hover:bg-[#a1d9ff6b]"
            >
              Add Game
            </Link>
          </div>
        </div>

      </nav>

      <Outlet />
    </>
  );
}


export default Navbar;
