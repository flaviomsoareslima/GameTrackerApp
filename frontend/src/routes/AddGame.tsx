import { useState } from "react";

function AddGame() {
    const [title, setTitle ] = useState("");
    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");
    const [launchYear, setLaunchYear] = useState("");
    const [rating, setRating] = useState("");
    const [notes, setNotes] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const newGame = {
            title,
            developer,
            publisher,
            launchYear: Number(launchYear),
            rating: rating ? Number(rating) : null,
            notes,
        };

        console.log("New game:", newGame);

        //Needs POST to backend
    }

    return (
         <main className="p-8">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-xl flex-col gap-4 rounded-xl bg-[#29363F] p-6"
            >
                <h2 className="text-2xl text-[#A1D9FF]">Add Game</h2>

                <label className="flex flex-col gap-2 text-[#A1D9FF]">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2 text-[#A1D9FF]">
                    Developer
                    <input
                        type="text"
                        value={developer}
                        onChange={(event) => setDeveloper(event.target.value)}
                        className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2 text-[#A1D9FF]">
                    Publisher
                    <input
                        type="text"
                        value={publisher}
                        onChange={(event) => setPublisher(event.target.value)}
                        className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2 text-[#A1D9FF]">
                    Launch Year
                    <input
                        type="number"
                        value={launchYear}
                        onChange={(event) => setLaunchYear(event.target.value)}
                        className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2 text-[#A1D9FF]">
                    Rating
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                        className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                    />
                </label>

                <label className="flex flex-col gap-2 text-[#A1D9FF]">
                    Notes
                    <textarea
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        className="min-h-28 rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="rounded-lg bg-[#A1D9FF] px-4 py-3 font-semibold text-[#101D25]"
                >
                    Create Game
                </button>
            </form>
        </main>
    );

    
}

export default AddGame;