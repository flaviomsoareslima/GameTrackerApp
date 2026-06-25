import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../component/progressBar";

interface Game {
    id: number;
    title: string;
    developer: string;
    publisher: string;
    isFavorite: boolean;
    rating: number | null;
    notes: string | null;
    launchYear: number;
    statusId: number | null;
    status: string;
    achievementProgress: number;
    categories: Category[];
}

interface Achievement {
    id?: number;
    achievementNumber: number;
    achievementText: string;
    isAchievementDone: boolean;
    isNew?: boolean;
}

interface Category {
    id?: number;
    category: string;
}



function GamePage() {
    const { id } = useParams();

    const [game, setGame] = useState<Game | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [error, setError] = useState("");
    const [isEditingGame, setIsEditingGame] = useState(false);
    const [isEditingAchievements, setIsEditingAchievements] = useState(false);
    const navigate = useNavigate();

    const [editTitle, setEditTitle] = useState("");
    const [editDeveloper, setEditDeveloper] = useState("");
    const [editPublisher, setEditPublisher] = useState("");
    const [editLaunchYear, setEditLaunchYear] = useState("");
    const [editRating, setEditRating] = useState("");
    const [editNotes, setEditNotes] = useState("");
    const [editStatusId, setEditStatusId] = useState("");
    const [editCategories, setEditCategories] = useState<Category[]>([]);
    const [categorySearch, setCategorySearch] = useState("");
    const [categoryResults, setCategoryResults] = useState<Category[]>([]);
    const [statuses, setStatuses] = useState<{ id: number; statusName: string }[]>([]);



    async function handleUpdateGame(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!id) return;


        const updatedGame = {
            title: editTitle,
            developer: editDeveloper,
            publisher: editPublisher,
            launchYear: Number(editLaunchYear),
            rating: editRating ? Number(editRating) : null,
            notes: editNotes,
            statusId: editStatusId ? Number(editStatusId) : null,
            categories: editCategories,
        };

        const response = await fetch(`http://localhost:3000/api/games/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGame),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || "Failed to update game.");
            return;
        }

        const selectedStatus = statuses.find(
            (status) => status.id === Number(editStatusId)
        );

        setGame({
            ...game!,
            ...updatedGame,
            status: selectedStatus ? selectedStatus.statusName : "No status",
        });

        setIsEditingGame(false);
    }

    useEffect(() => {
        async function fetchGame() {
            try {
                const response = await fetch(`http://localhost:3000/api/games/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || "Failed to load game.");
                    return;
                }

                setGame(data.game);
                setAchievements(data.achievements || []);
                setStatuses(data.statuses || []);
            } catch (error) {
                console.error("Failed to fetch game:", error);
                setError("Failed to load game.");
            }
        }

        fetchGame();
    }, [id]);

    useEffect(() => {
        const trimmedSearch = categorySearch.trim();

        if (trimmedSearch.length < 1) {
            setCategoryResults([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/categories/search?q=${encodeURIComponent(trimmedSearch)}`
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
    }, [categorySearch]);


    async function handleSaveAchievements() {
        if (!id) return;

        try {
            const savedAchievements = await Promise.all(
                achievements.map(async (achievement) => {
                    if (achievement.isNew) {
                        const response = await fetch(
                            `http://localhost:3000/api/games/${id}/achievements`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    achievementNumber: achievement.achievementNumber,
                                    achievementText: achievement.achievementText,
                                    isAchievementDone: achievement.isAchievementDone,
                                }),
                            }
                        );

                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.error || "Failed to create achievement.");
                        }

                        return data;
                    }

                    const response = await fetch(
                        `http://localhost:3000/api/achievements/${achievement.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                achievementNumber: achievement.achievementNumber,
                                achievementText: achievement.achievementText,
                                isAchievementDone: achievement.isAchievementDone,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || "Failed to update achievement.");
                    }

                    return achievement;
                })
            );

            setAchievements(savedAchievements);
            setIsEditingAchievements(false);
        } catch (error) {
            console.error("Failed to save achievements:", error);
            setError("Failed to save achievements.");
        }
    }
    async function handleDeleteGame() {
        const confirmed = window.confirm("Are you sure you want to delete this game?");

        if (!confirmed || !id) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/games/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to delete game.");
                return;
            }

            navigate("/?filter=library");
        } catch (error) {
            console.error("Failed to delete game:", error);
            setError("Failed to delete game.");
        }
    }

    if (error) {
        return <main className="p-8 text-red-400">{error}</main>;
    }

    if (!game) {
        return <main className="p-8 text-[#A1D9FF]">Loading...</main>;
    }

    async function handleDeleteAchievement(achievement: Achievement) {
        const confirmed = window.confirm("Delete this achievement?");

        if (!confirmed) {
            return;
        }

        if (achievement.isNew || !achievement.id) {
            setAchievements((current) =>
                current.filter((item) => item !== achievement)
            );
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/achievements/${achievement.id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to delete achievement.");
                return;
            }

            setAchievements((current) =>
                current.filter((item) => item.id !== achievement.id)
            );
        } catch (error) {
            console.error("Failed to delete achievement:", error);
            setError("Failed to delete achievement.");
        }
    }

    async function handleToggleFavorite() {
        if (!game) return;

        const nextFavorite = !game.isFavorite;

        try {
            const response = await fetch(
                `http://localhost:3000/api/games/${game.id}/favorite`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isFavorite: nextFavorite,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to update favorite.");
                return;
            }

            setGame({
                ...game,
                isFavorite: data.isFavorite,
            });
        } catch (error) {
            console.error("Failed to update favorite:", error);
            setError("Failed to update favorite.");
        }
    }

    

    function addCategory(category: Category) {
        const alreadySelected = editCategories.some(
            (item) => item.category.toLowerCase() === category.category.toLowerCase()
        );

        if (alreadySelected) {
            return;
        }

        setEditCategories((current) => [...current, category]);
        setCategorySearch("");
        setCategoryResults([]);
    }

    function addTypedCategory() {
        const trimmedCategory = categorySearch.trim();

        if (!trimmedCategory) {
            return;
        }

        addCategory({
            category: trimmedCategory,
        });
    }

    function removeCategory(category: Category) {
        setEditCategories((current) =>
            current.filter(
                (item) => item.category.toLowerCase() !== category.category.toLowerCase()
            )
        );
    }

    return (
        <main className="p-8 text-[#A1D9FF]">
            <section className="mx-auto flex max-w-4xl flex-col gap-6">
                <div className="rounded-xl bg-[#29363F] p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-semibold">{game.title}</h2>
                            <p className="mt-2 text-gray-300">{game.status}</p>
                        </div>

                        <button
                            type="button"
                            onClick={handleToggleFavorite}
                            className={`rounded-lg px-3 py-2 font-semibold ${game.isFavorite
                                ? "bg-[#A1D9FF] text-[#101D25]"
                                : "bg-[#101D25] text-[#A1D9FF]"
                                }`}
                        >
                            {game.isFavorite ? "Favorite" : "Not favorite"}
                        </button>
                    </div>

                    {isEditingGame ? (
                        <form onSubmit={handleUpdateGame} className="mt-6 flex flex-col gap-4">
                            <label className="flex flex-col gap-2">
                                Title
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(event) => setEditTitle(event.target.value)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                Status
                                <select
                                    value={editStatusId}
                                    onChange={(event) => setEditStatusId(event.target.value)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                >
                                    <option value="">No status</option>

                                    {statuses.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.statusName}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2">
                                Developer
                                <input
                                    type="text"
                                    value={editDeveloper}
                                    onChange={(event) => setEditDeveloper(event.target.value)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                Publisher
                                <input
                                    type="text"
                                    value={editPublisher}
                                    onChange={(event) => setEditPublisher(event.target.value)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                Categories

                                <div className="flex flex-wrap gap-2">
                                    {editCategories.map((category) => (
                                        <button
                                            key={category.id ?? category.category}
                                            type="button"
                                            onClick={() => removeCategory(category)}
                                            className="rounded-lg bg-[#A1D9FF] px-3 py-1 text-[#101D25]"
                                        >
                                            {category.category} ×
                                        </button>
                                    ))}
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={categorySearch}
                                        onChange={(event) => setCategorySearch(event.target.value)}
                                        className="w-full rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                        placeholder="Search or add category"
                                    />

                                    {categoryResults.length > 0 && (
                                        <div className="absolute top-full z-50 mt-2 w-full rounded-lg bg-[#101D25] shadow-lg">
                                            {categoryResults.map((category) => (
                                                <button
                                                    key={category.id}
                                                    type="button"
                                                    onClick={() => addCategory(category)}
                                                    className="block w-full px-4 py-2 text-left hover:bg-[#29363F]"
                                                >
                                                    {category.category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={addTypedCategory}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 text-[#A1D9FF]"
                                >
                                    Add Category
                                </button>
                            </label>

                            <label className="flex flex-col gap-2">
                                Launch Year
                                <input
                                    type="number"
                                    value={editLaunchYear}
                                    onChange={(event) => setEditLaunchYear(event.target.value)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                Rating
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={editRating}
                                    onChange={(event) => setEditRating(event.target.value)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                Notes
                                <textarea
                                    value={editNotes}
                                    onChange={(event) => setEditNotes(event.target.value)}
                                    className="min-h-28 rounded-lg bg-[#101D25] px-4 py-2 outline-none"
                                />
                            </label>

                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-[#A1D9FF] px-4 py-2 font-semibold text-[#101D25]"
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEditingGame(false)}
                                    className="rounded-lg bg-[#101D25] px-4 py-2 text-[#A1D9FF]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <p>Developer: {game.developer}</p>
                            <p>Publisher: {game.publisher}</p>
                            <p>
                                Categories:{" "}
                                {game.categories.length > 0
                                    ? game.categories.map((category) => category.category).join(", ")
                                    : "No categories"}
                            </p>
                            <p>Launch year: {game.launchYear}</p>
                            <p>Rating: {game.rating ?? "No rating"}</p>
                        </div>
                    )}

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between">
                            <p>Achievement progress</p>
                            <p>{Number(game.achievementProgress)}%</p>
                        </div>

                        <ProgressBar value={Number(game.achievementProgress)} />
                    </div>

                    {game.notes && (
                        <div className="mt-6">
                            <h3 className="mb-2 text-xl">Notes</h3>
                            <p className="text-gray-300">{game.notes}</p>
                        </div>
                    )}
                </div>

                <div className="rounded-xl bg-[#29363F] p-6">
                    <h3 className="mb-4 text-2xl">Achievements</h3>


                    {isEditingAchievements ? (
                        <div className="flex flex-col gap-3">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id ?? `new-${achievement.achievementNumber}`}
                                    className="flex items-center gap-3 rounded-lg bg-[#101D25] px-4 py-3"
                                >
                                    <input
                                        type="number"
                                        value={achievement.achievementNumber}
                                        onChange={(event) => {
                                            setAchievements((current) =>
                                                current.map((item) =>
                                                    item === achievement
                                                        ? {
                                                            ...item,
                                                            achievementNumber: Number(event.target.value),
                                                        }
                                                        : item
                                                )
                                            );
                                        }}
                                        className="w-20 rounded-lg bg-[#29363F] px-3 py-2 outline-none"
                                    />
                                    <input
                                        type="checkbox"
                                        checked={achievement.isAchievementDone}
                                        onChange={(event) => {
                                            setAchievements((current) =>
                                                current.map((item) =>
                                                    item === achievement
                                                        ? {
                                                            ...item,
                                                            isAchievementDone: event.target.checked,
                                                        }
                                                        : item
                                                )
                                            );
                                        }}
                                    />


                                    <input
                                        type="text"
                                        value={achievement.achievementText}
                                        onChange={(event) => {
                                            setAchievements((current) =>
                                                current.map((item) =>
                                                    item === achievement
                                                        ? {
                                                            ...item,
                                                            achievementText: event.target.value,
                                                        }
                                                        : item
                                                )
                                            );
                                        }}
                                        className="flex-1 rounded-lg bg-[#29363F] px-3 py-2 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteAchievement(achievement)}
                                        className="rounded-lg bg-red-500 px-3 py-2 font-semibold text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => {
                                    setAchievements((current) => [
                                        ...current,
                                        {
                                            achievementNumber: Math.max(
                                                0, ...current.map((achievement) => achievement.achievementNumber
                                                )) + 1,
                                            achievementText: "",
                                            isAchievementDone: false,
                                            isNew: true,
                                        },
                                    ]);
                                }}
                                className="rounded-lg bg-[#101D25] px-4 py-2 text-[#A1D9FF]"
                            >
                                Add Achievement
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveAchievements}
                                className="rounded-lg bg-[#A1D9FF] px-4 py-2 font-semibold text-[#101D25]"
                            >
                                Save Achievements
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsEditingAchievements(false)}
                                className="rounded-lg bg-[#101D25] px-4 py-2 text-[#A1D9FF]"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        achievements.length === 0 ? (
                            <p className="text-gray-300">No achievements added yet.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="flex items-center justify-between rounded-lg bg-[#101D25] px-4 py-3"
                                    >
                                        <div>
                                            <p>
                                                #{achievement.achievementNumber}{" "}
                                                {achievement.achievementText}
                                            </p>
                                        </div>

                                        <span>
                                            {achievement.isAchievementDone ? "Done" : "Not done"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                </div>
            </section>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setEditTitle(game.title);
                        setEditDeveloper(game.developer || "");
                        setEditPublisher(game.publisher || "");
                        setEditLaunchYear(String(game.launchYear || ""));
                        setEditRating(game.rating ? String(game.rating) : "");
                        setEditNotes(game.notes || "");
                        setEditCategories(game.categories || []);
                        setEditStatusId(game.statusId ? String(game.statusId) : "");
                        setIsEditingGame(true);
                    }}
                    className="rounded-lg bg-[#A1D9FF] px-4 py-2 font-semibold text-[#101D25]"
                >
                    Edit Game
                </button>

                <button
                    type="button"
                    onClick={() => setIsEditingAchievements(true)}
                    className="rounded-lg bg-[#A1D9FF] px-4 py-2 font-semibold text-[#101D25]"
                >
                    Edit Achievements
                </button>

                <button
                    type="button"
                    onClick={handleDeleteGame}
                    className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white"
                >
                    Delete Game
                </button>
            </div>
        </main>
    );
}

export default GamePage;