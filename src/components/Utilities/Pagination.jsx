const HeaderMenu = ({ page, lastPage, setPage }) =>
{
    const scrollTop = () => {
        scrollTo({
            behavior: "smooth",
            top: 0
        })
    }
    const handleNextPage = () => {
        setPage((prevState) => prevState + 1)
        scrollTop()
    }
    const handlePrevPage = () => {
        setPage((prevState) => prevState - 1)
        scrollTop()
    }

    return (
        <div className="flex justify-center items-center p-3 gap-4">
            { page <= 1 ? null : 
                <button onClick={handlePrevPage} className="py-1 px-4 mt-3 text-md font-medium text-color-zinc-400 focus:outline-none transition-all rounded-lg border border-color-zinc-400 hover:border-color-sky-600 hover:bg-color-sky-600 hover:text-color-white focus:z-10 focus:ring-4 focus:ring-gray-200">Prev</button>
            }
            
            <p className="py-1 px-4 mt-3 text-md font-medium text-color-zinc-400  transition-all rounded-lg">
                {page} of {lastPage}
            </p>

            {page >= lastPage ? null :
                <button onClick={handleNextPage} className="py-1 px-4 mt-3 text-md font-medium text-color-zinc-400 focus:outline-none transition-all rounded-lg border border-color-zinc-400 hover:border-color-sky-600 hover:bg-color-sky-600 hover:text-color-white focus:z-10 focus:ring-4 focus:ring-gray-200 ">Next</button>
            }
        </div>
    )
}

export default HeaderMenu