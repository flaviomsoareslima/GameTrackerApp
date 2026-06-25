import { useState } from "react";

function AddGame() {
    // every state value is connect to on input in the form
    const [title, setTitle] = useState("");
    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");
    const [launchYear, setLaunchYear] = useState("");
    const [rating, setRating] = useState("");
    const [notes, setNotes] = useState("");

    // runs when the create game button is pressed
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Prevents the browser from refreshing the page
        event.preventDefault();


        const newGame = {
            title,
            developer,
            publisher,
            launchYear: Number(launchYear),
            rating: rating ? Number(rating) : null,
            notes,
        };

        try {
            const response = await fetch("http://localhost:3000/api/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(newGame),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to create game:", data.error);
                return;
            }

            console.log("Game created:", data);

            // clears the form after the game object has been sent to the backend 
            // and got a response from the backend
            setTitle("");
            setDeveloper("");
            setPublisher("");
            setLaunchYear("");
            setRating("");
            setNotes("");
        } catch (error) {
            console.error("Request failed:", error);
        }
    } 
        

return (
    <main className="p-4 md:p-8">
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-xl bg-[#29363F] p-4 md:p-6"
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
            // triggers the onsubmit of the form
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