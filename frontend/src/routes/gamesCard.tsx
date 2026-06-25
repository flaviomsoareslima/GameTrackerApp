import ProgressBar from "../component/progressBar";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


interface CardProps {
    id: number;
    status: string;
    title: string;
    achievementProgress: number;
}

function Card({ id, status, title, achievementProgress }: CardProps) {
    return (
        <Link
            to={`/game/${id}`}
            className="flex w-full flex-col gap-2 rounded-xl bg-[#29363F] p-4 hover:bg-[#344650]">
            <h3 className="text-[#A1D9FF]">{status}</h3>
            <h2 className="wrap-break-words text-[#A1D9FF]">{title}</h2>
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-[#A1D9FF]">Progress</p>
                <p className="text-[#A1D9FF]">{achievementProgress}%</p>
            </div>

            <ProgressBar value={achievementProgress}></ProgressBar>
        </Link>
    )

}

interface Game {
    id: number;
    status: string;
    title: string;
    achievementProgress: number;
}

function GamesCard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "";
    const page = Number(searchParams.get("page") || 1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const title = searchParams.get("title") || "";
    const developer = searchParams.get("developer") || "";
    const publisher = searchParams.get("publisher") || "";
    const ratingOrder = searchParams.get("ratingOrder") || "";
    const launchYearOrder = searchParams.get("launchYearOrder") || "";
    const status = searchParams.get("status") || "";
    const titleOrder = searchParams.get("titleOrder") || "";
    const developerOrder = searchParams.get("developerOrder") || "";
    const publisherOrder = searchParams.get("publisherOrder") || "";
    const category = searchParams.get("category") || "";
    const [categoryInput, setCategoryInput] = useState(category);
    const [categoryResults, setCategoryResults] = useState<{ id: number; category: string }[]>([]);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    const [games, setGames] = useState<Game[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    function handleFilterSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const params = new URLSearchParams();

        params.set("filter", "custom");
        params.set("page", "1");

        for (const [key, value] of formData.entries()) {
            const textValue = String(value).trim();

            if (textValue) {
                params.set(key, textValue);
            }
        }

        setSearchParams(params);
    }

    useEffect(() => {
        async function fetchGames() {
            try {
                let url = "";

                if (filter === "custom") {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", String(page));

                    url = `http://localhost:3000/api/games/filter?${params.toString()}`;
                } else if (filter === "library") {
                    url = `http://localhost:3000/api/games?page=${page}`;

                } else if (filter === "favorites") {
                    url = `http://localhost:3000/api/games/favorites?page=${page}`;
                } else if (search.trim()) {
                    url = `http://localhost:3000/api/games/search?q=${encodeURIComponent(search)}&page=${page}`;
                } else {
                    setGames([]);
                    return;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (Array.isArray(data.games)) {
                    setGames(data.games);
                    setTotalPages(data.totalPages || 1);
                } else {
                    console.error("Expected an array, got:", data);
                    setGames([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Failed to fetch games:", error);
                setGames([]);
            }
        }

        fetchGames();
    }, [searchParams]);

    useEffect(() => {
        if (!isCategoryDropdownOpen) {
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/categories/search?q=${encodeURIComponent(categoryInput)}`
                );

                const data = await response.json();

                if (Array.isArray(data)) {
                    setCategoryResults(data);
                } else {
                    setCategoryResults([]);
                }
            } catch (error) {
                console.error("Failed to search categories:", error);
                setCategoryResults([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [categoryInput, isCategoryDropdownOpen]);

    useEffect(() => {
        setCategoryInput(category);
    }, [category]);

    return (
        <main className="p-8">
            <div className="mb-8 rounded-xl bg-[#29363F] p-4 text-[#A1D9FF]">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Filters</h2>

                    <button
                        type="button"
                        onClick={() => setIsFilterOpen((current) => !current)}
                        className="rounded-lg bg-[#101D25] px-4 py-2 text-[#A1D9FF] hover:bg-[#344650]"
                    >
                        {isFilterOpen ? "Hide filters" : "Show filters"}
                    </button>
                </div>

                {isFilterOpen && (
                    <form
                        onSubmit={handleFilterSubmit}
                        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                    >
                        <input name="title" defaultValue={title} placeholder="Title" className="rounded-lg bg-[#101D25] px-3 py-2 outline-none" />
                        <input name="developer" defaultValue={developer} placeholder="Developer" className="rounded-lg bg-[#101D25] px-3 py-2 outline-none" />
                        <input name="publisher" defaultValue={publisher} placeholder="Publisher" className="rounded-lg bg-[#101D25] px-3 py-2 outline-none" />

                        <select
                            name="ratingOrder"
                            defaultValue={ratingOrder}
                            className="rounded-lg bg-[#101D25] px-3 py-2 outline-none"
                        >
                            <option value="">Rating</option>
                            <option value="asc">Rating ascending</option>
                            <option value="desc">Rating descending</option>
                        </select>

                        <select
                            name="launchYearOrder"
                            defaultValue={launchYearOrder}
                            className="rounded-lg bg-[#101D25] px-3 py-2 outline-none"
                        >
                            <option value="">Launch year</option>
                            <option value="asc">Year ascending</option>
                            <option value="desc">Year descending</option>
                        </select>

                        <select
                            name="titleOrder"
                            defaultValue={titleOrder}
                            className="rounded-lg bg-[#101D25] px-3 py-2 outline-none"
                        >
                            <option value="">Title order</option>
                            <option value="asc">Title A-Z</option>
                            <option value="desc">Title Z-A</option>
                        </select>

                        <select
                            name="developerOrder"
                            defaultValue={developerOrder}
                            className="rounded-lg bg-[#101D25] px-3 py-2 outline-none"
                        >
                            <option value="">Developer order</option>
                            <option value="asc">Developer A-Z</option>
                            <option value="desc">Developer Z-A</option>
                        </select>

                        <select
                            name="publisherOrder"
                            defaultValue={publisherOrder}
                            className="rounded-lg bg-[#101D25] px-3 py-2 outline-none"
                        >
                            <option value="">Publisher order</option>
                            <option value="asc">Publisher A-Z</option>
                            <option value="desc">Publisher Z-A</option>
                        </select>

                        <input name="status" defaultValue={status} placeholder="Status" className="rounded-lg bg-[#101D25] px-3 py-2 outline-none" />

                        <div className="relative">
                            <input
                                name="category"
                                value={categoryInput}
                                onChange={(event) => {
                                    setCategoryInput(event.target.value);
                                    setIsCategoryDropdownOpen(true);
                                }}
                                onFocus={() => setIsCategoryDropdownOpen(true)}
                                placeholder="Category"
                                className="w-full rounded-lg bg-[#101D25] px-3 py-2 outline-none"
                            />

                            {isCategoryDropdownOpen && categoryResults.length > 0 && (
                                <div className="absolute top-full z-50 mt-2 w-full rounded-lg bg-[#101D25] shadow-lg">
                                    {categoryResults.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => {
                                                setCategoryInput(category.category);
                                                setIsCategoryDropdownOpen(false);
                                            }}
                                            className="block w-full px-4 py-2 text-left text-[#A1D9FF] hover:bg-[#29363F]"
                                        >
                                            {category.category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="rounded-lg bg-[#A1D9FF] px-4 py-2 font-semibold text-[#101D25]">
                            Filter
                        </button>

                        <Link to="/?filter=library&page=1" className="rounded-lg bg-[#101D25] px-4 py-2 text-center text-[#A1D9FF]">
                            Clear
                        </Link>

                    </form>
                )}
            </div>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {games.map((game) => (
                    <Card
                        key={game.id}
                        id={game.id}
                        status={game.status}
                        title={game.title}
                        achievementProgress={game.achievementProgress}
                    />
                ))}
                <div className="col-span-full flex flex-wrap justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;

                        const params = new URLSearchParams(searchParams);
                        params.set("page", String(pageNumber));

                        return (
                            <Link
                                key={pageNumber}
                                to={`/?${params.toString()}`}
                                className={`rounded-lg px-4 py-2 text-[#A1D9FF] ${pageNumber === page
                                    ? "bg-[#29363F]"
                                    : "hover:bg-[#a1d9ff6b]"
                                    }`}
                            >
                                {pageNumber}
                            </Link>

                        );
                    })}
                </div>
            </section>
        </main>
    )

}

export default GamesCard