"use client"

import { FileSearch } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
            <div className="flex justify-center items-center gap-1 flex-col">
                <FileSearch size={150} className="text-color-accent"/>
                <h3 className="text-color-accent text-xl font-bold">Not Found</h3>
                <button onClick={() => router.back()} className="py-1 px-4 mt-3 text-md font-medium text-color-zinc-400 focus:outline-none transition-all rounded-lg border border-color-zinc-400 hover:border-color-sky-600 hover:bg-color-sky-600 hover:text-color-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back</button>
            </div>
        </div>
    )
}

export default Page