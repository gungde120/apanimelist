import { getAnimeResponse } from "@/service/api-service"
import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { authUserSession } from "@/service/auth-service"

const Page = async ({ params }) => {
    const user = await authUserSession()
  // fetch data
    const { keyword } = params
    const decodeKeyword = decodeURI(keyword)
    const searchAnime = await getAnimeResponse(`anime`, `q=${decodeKeyword}`)

    return (
        <div>
            <section>
                <div className="mb-4">
                    <Header title={`Search result for "${decodeKeyword}"`}/>
                </div>
                <AnimeList api={searchAnime} user={user}/>
            </section>
        </div>
    )
}

export default Page