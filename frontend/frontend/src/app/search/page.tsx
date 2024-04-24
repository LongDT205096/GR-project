"use client"

const Search = () => {
    return (
        <div style={{ background: "linear-gradient(to bottom, transparent, black),url(/assets/img/search_back.jpg)", height: "100vh", width: "100%" }} className="flex items-center overflow-hidden justify-center bg-center bg-cover bg-no-repeat">
            <div className="w-3/4">
                <form action="search/result" method="get">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" name="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-500 focus:border-neutral-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" placeholder="Search Movies..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">Search</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Search
