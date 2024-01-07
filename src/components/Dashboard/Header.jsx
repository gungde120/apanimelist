"use client"

import { useRouter } from  "next/navigation"
import { CaretLeft } from "@phosphor-icons/react"

const Header = ({ title }) => {
    const router = useRouter()

    const HandleBack = (event) => {
        event.preventDefault()
        router.back()
    }

    return (
        <button onClick={HandleBack} className="flex items-center gap-1 transition-all border border-color-zinc-400 hover:shadow-md hover:bg-color-dark hover:text-color-white rounded-lg py-1 px-2">
                <CaretLeft size={16} weight="bold" />
                <span>{ title }</span>
        </button>
    )
}

export default Header