import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/service/api-service"
import { authUserSession } from '@/service/auth-service';

const Page = async () => {
  const user = await authUserSession()
  const topAnime = await getAnimeResponse("top/anime", "limit=10")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 10)


  return (
    <div>
      <section>
        <div className="pb-3">
          <Header title="Most Popular" linkTitle="See All" linkHref="/popular"/>
        </div>
        <AnimeList api={topAnime} user={user}/>
      </section>

      <section>
        <div className="pb-3">
          <Header title="Recommendations"/>
        </div>
        <AnimeList api={recommendedAnime} user={user}/>
      </section>
    </div>
  )
}

export default Page
