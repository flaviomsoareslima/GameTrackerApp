import { useState, useRef, useEffect } from "react";
//just an icon for the search button
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


function SearchBar() {
    // Stores what the user typed in the search input
    const [query, setQuery] = useState("");
    // Toggle for the dropdown menu
    const [isOpen, setIsOpen] = useState(false);
    // Reference to the whole search bar area, let it detect clicks outside the search bar
    // used to close the dropdown menu when clicked outside
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Changes the URL when the user searches
    const navigate = useNavigate();

    //search results when user presses Enter or clicks the search icon
    const handleSearch = () => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        setIsOpen(false);
        navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
    };

    
    // closes the dropdowm if it detects clicks outside the search bar
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        // mouse click listener
        document.addEventListener("mousedown", handleClickOutside);

        // removes the listener when the component is closed
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // searches results for the dropdown menu and has a debounce(delay in the requests)
    useEffect(() => {
        const trimmedQuery = query.trim();

        if (trimmedQuery.length < 2) {
            setResults({
                titles: [],
                developers: [],
                publishers: [],
            });
            return;
        }
        //setTimeout(...,500)
        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/search?q=${encodeURIComponent(trimmedQuery)}`
                );

                const data = await response.json();

                //gives empty arrays if backend responds with missing fields
                setResults({
                    titles: data.titles || [],
                    developers: data.developers || [],
                    publishers: data.publishers || [],
                });
                setIsOpen(true);
            } catch (error) {
                console.error("Search failed: ", error);
            }
        }, 500);

        // restarts timer everytime the query changes
        return () => clearTimeout(timeoutId);
    }, [query]);

    // defines the types for the search results in the dropdown menu
    type SearchResults = {
        titles: { id: number; title: string }[];
        developers: { developer: string }[];
        publishers: { publisher: string }[];
    }

    // stores the results from the backend
    const [results, setResults] = useState<SearchResults>({
        titles: [],
        developers: [],
        publishers: [],
    });

    
    
    // shows search bar and the dropdown menu
    return (
        <div ref={dropdownRef} className="relative flex w-full items-center">
            <input
                type="search"
                value={query}
                placeholder="Search games..."
                className="h-11 w-full rounded-xl bg-[#29363F] px-4 pr-12 text-[#A1D9FF] outline-none"
                onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        
                        setIsOpen(false), handleSearch();
                    }
                }}
            />

            <button
                type="button"
                onClick={() => {
                    setIsOpen(false),
                    handleSearch();
                }}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#A1D9FF]"
            >
                <Search size={20} />
            </button>
            {/* shows dropdown menu if isOpen is true */}
            {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-[#29363F] rounded-xl shadow-lg overflow-hidden z-50">

                    {/* Titles */}
                    <div className="border-b border-[#3A4A55]">
                        <h3 className="px-4 py-2 text-xs uppercase text-gray-400">
                            Titles
                        </h3>
                        {/* shows all results and make them links to queries */}
                        {results.titles.map((game) => (
                            <Link
                                key={game.title}
                                to={`/game/${game.id}`}
                                className="block px-4 py-2 text-[#A1D9FF] hover:bg-[#3A4A55]"
                            >
                                {game.title}
                            </Link>
                        ))}
                    </div>

                    {/* Developers */}
                    <div>
                        <h3 className="px-4 py-2 text-xs uppercase text-gray-400">
                            Developers
                        </h3>

                        {results.developers.map((item) => (
                            <Link
                                key={item.developer}
                                to={`/?filter=custom&developer=${encodeURIComponent(item.developer)}&page=1`}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-[#A1D9FF] hover:bg-[#3A4A55]"
                            >
                                {item.developer}
                            </Link>
                        ))}
                    </div>
                    <div>
                        <h3 className="px-4 py-2 text-xs uppercase text-gray-400">
                            Publishers
                        </h3>

                        {results.publishers.map((item) => (
                            <Link
                                key={item.publisher}
                                to={`/?filter=custom&publisher=${encodeURIComponent(item.publisher)}&page=1`}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-[#A1D9FF] hover:bg-[#3A4A55]"
                            >
                                {item.publisher}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar
