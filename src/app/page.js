import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="space-y-6 sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <div>
                    <p class="text-lg font-semibold">Welcome! Splitwise but Wiser!</p>
                </div>
                <div>
                    <a href="/signup">
                        <button className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Get started</button>
                    </a>
                </div>
            </div>
        </main>
    );
}
