import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-8 text-[#A1D9FF]">
            <h2 className="text-3xl font-semibold">Page not found</h2>

            <p className="text-gray-300">
                This page does not exist.
            </p>

            <Link
                to="/?filter=library&page=1"
                className="rounded-lg bg-[#A1D9FF] px-4 py-2 font-semibold text-[#101D25]"
            >
                Go to Library
            </Link>
        </main>
    );
}

export default NotFound;