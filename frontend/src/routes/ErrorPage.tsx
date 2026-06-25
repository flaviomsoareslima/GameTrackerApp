import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();

    console.error(error);

    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-8 text-[#A1D9FF]">
            <h2 className="text-3xl font-semibold">Something went wrong</h2>

            <p className="max-w-md text-center text-gray-300">
                The page crashed while loading. You can return to the library and try again.
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

export default ErrorPage;