import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
    return (
        <div className="flex lg:flex-row md:flex-row justify-between items-center">
            <h1 className="text-1xl font-bold">{title}</h1>
            {
                linkHref && linkTitle ?
                    <Link 
                        href={linkHref} 
                        className="md:text-md text-md font-bold hover:text-color-sky-500 transition-all">
                        {linkTitle}
                    </Link>
                : null 
            }
            
        </div>
    )
}

export default Header