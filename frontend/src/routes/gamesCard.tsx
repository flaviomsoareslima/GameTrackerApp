import ProgressBar from "../component/progressBar";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


interface CardProps {
    status: string;
    title: string;
    achievementProgress: number;
}

function Card({ status, title, achievementProgress }: CardProps) {
    return (
        <div className="flex flex-col gap-2 bg-[#29363F] w-80 p-4 rounded-xl">
            <h3 className="text-[#A1D9FF]">{status}</h3>
            <h2 className="text-[#A1D9FF]">{title}</h2>
            <div className="flex flex-row">
                <p className="text-[#A1D9FF]">Progress</p>
                <p className="text-[#A1D9FF]">{achievementProgress}%</p>
            </div>

            <ProgressBar value={achievementProgress}></ProgressBar>
        </div>
    )

}

interface Game {
    id: number;
    status: string;
    title: string;
    achievementProgress: number;
}

function GamesCard() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "";
    const page = Number(searchParams.get("page") || 1);

    const [games, setGames] = useState<Game[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchGames() {
            try {
                let url = "";

                if (filter === "library") {
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
    }, [search, filter, page]);
    
    return (
        <section className="grid grid-cols-4 gap-4 p-8">
            {games.map((game) => (
                <Card
                    key={game.id}
                    status={game.status}
                    title={game.title}
                    achievementProgress={game.achievementProgress}
                />
            ))}
            <div className="col-span-4 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    const params = new URLSearchParams(searchParams);
                    params.set("page", String(pageNumber));

                    return (
                        <Link
                            key={pageNumber}
                            to={`/?${params.toString()}`}
                            className={`rounded-lg px-4 py-2 text-[#A1D9FF] ${
                                pageNumber === page
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
    )

}

export default GamesCard