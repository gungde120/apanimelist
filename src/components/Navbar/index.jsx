import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"


const Navbar = () => {
    return (
        // shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        <header className="bg-color-primary border border-color-accent border-b-1 border-t-0 border-l-0 border-r-0">
            <div className="flex lg:flex-row md:flex-row flex-col p-3 gap-3 md:items-center">
                <Link href="/" className="transition-all font-bold hover:text-color-sky-500 text-2xl mr-16 ml-1 text-color-dark">ApanimeList</Link>
                <InputSearch/>
                <div className="lg:ml-auto">
                    <UserActionButton />
                </div>
            </div>
        </header>
    )
}

export default Navbar