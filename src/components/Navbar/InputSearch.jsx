"use client"

import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()
    const [isEmptySearch, setIsEmptySearch] = useState(true)

    const handleSearch = (event) => {
        const keyword = searchRef.current.value
        setIsEmptySearch(false)
        if(!keyword || keyword.trim() == "") {
            setIsEmptySearch(true)
            return
        }

        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            setIsEmptySearch(false)
            router.push(`/search/${keyword}`);
        }
    }

    const handleDeleteSearch = () => {
        searchRef.current.value = ""
        setIsEmptySearch(true)
    }

    return (
        <div className="flex gap-3 ">
        <div className="relative w-full">
            <input 
                placeholder="search anime..."
                className="px-2 py-1.5 rounded-lg w-full border border-color-accent"
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            {!isEmptySearch &&
                <X 
                    onClick={handleDeleteSearch}
                    size={24}
                    weight="regular"
                    className="absolute top-0.5 end-0.5 p-1 h-8 w-8 cursor-pointer bg-color-white hover:bg-color-primary rounded-lg transition-all"
                />
            }
            
        </div>  
            <button className="px-2 py-1.5 bg-color-white border border-color-accent rounded-lg hover:text-color-white hover:bg-color-dark hover:shadow-md transition-all text-color-accent" 
                onClick={handleSearch}>
                <MagnifyingGlass size={20} />
            </button>
            
        </div>
    )
}

export default InputSearch