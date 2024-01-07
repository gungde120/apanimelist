import { getAnimeResponse } from "@/service/api-service"
import Image from "next/image"
import { Star } from "@phosphor-icons/react/dist/ssr"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Header from "@/components/Dashboard/Header"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/service/auth-service"
import prisma from "@/service/prisma"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentBox from "@/components/AnimeList/CommentBox"
import Link from "next/link"
import RemoveCollectionButton from "@/components/AnimeList/RemoveCollectionButton"

const Page = async({params : {id}}) => {

    const response = await getAnimeResponse(`anime/${id}`)
    const anime = response.data

    const user = await authUserSession()

    // search validation if the data is already added to favorite
    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    })

    return (
        <>
        <div className="mb-3">
            <Header title="Back"/>
        </div>

        <div className="border border-color-accent border-t-0 my-2"></div>

        {anime && (
            <>
            <div>
                <div className="mb-3">
                    <div className="pb-2">
                    <h3 className="font-bold text-xl">
                        {anime.title} {anime.year ? ` - (${anime.year})` : null}
                    </h3>
                        <h3 className="">{anime.title_english}</h3>
                        <h3 className="">{anime.title_japanese}</h3>
                    </div>

                    <div className="border border-color-accent border-t-0 mb-3"></div>

                    <div className="">
                    {user && (
                    <>
                        {collection ? (
                            // Render "Remove" button if there is a collection
                            <>
                                <div className="mb-3">
                                    <RemoveCollectionButton
                                        id={collection.id}
                                        anime_mal_id={id}
                                        user_email={user.email}
                                    />
                                </div>
                                <div className="border border-color-accent border-t-0 mb-3"></div>
                            </>
                        ) : (
                            // Render "Add to Collection" button if there is no collection
                            <>
                                <div className="mb-3">
                                    <CollectionButton
                                        anime_mal_id={id}
                                        user_email={user.email}
                                        anime_image={anime.images.webp.image_url}
                                        anime_title={anime.title}
                                    />
                                </div>
                                <div className="border border-color-accent border-t-0 mb-3"></div>
                            </>
                        )}
                    </>
                    )}
                    </div>


                    <div className="flex flex-row gap-3 items-center overflow-x-auto whitespace-nowrap pb-3">
                        <div className="h-10 flex px-3 py-2 font-bold text-sm border border-color-accent rounded-lg">
                            {anime.rank ? 
                            (`Ranked #${anime.rank}`) : ("No Rank")}
                        </div>
                        <div className="h-10 flex flex-row px-3 py-2 border border-color-accent rounded-lg text-sm gap-1 items-center">
                            <Star size={16} color="#fde047" weight="fill" />
                            <p className="font-bold">{anime.score}</p>
                            {anime.scored_by ? (
                                <p className="text-xs">({anime.scored_by?.toLocaleString()}) users</p>

                            ) : (
                                <p className="text-xs">(0) users</p>

                            )}
                        </div>
                        <div className="h-10 flex text-sm px-3 py-2 border border-color-accent rounded-lg">
                            <p>{anime.type} {anime.episodes > 1 ? 
                            (`(${anime.episodes} eps)`) : null}</p>
                        </div>
                        <div className="h-10 flex text-sm px-3 py-2 border border-color-accent rounded-lg">
                            {anime.members.toLocaleString()} members
                        </div>
                    </div>

                    <div className="border border-color-accent border-t-0 mb-3"></div>
                </div>
                <div className="flex flex-row sm:flex-nowrap flex-wrap gap-3 mb-3">
                    <Image 
                        className="rounded-lg object-cover lg:w-64 md:w-64 sm:w-64 w-full justify-center items-center
                        shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]" 
                        src={anime.images.webp.image_url} 
                        alt={anime.images.jpg.image_url}
                        width={300} 
                        height={350}
                    />
                    
                    <VideoPlayer youtubeId={anime.trailer.youtube_id} thumbnail={anime.trailer.images.large_image_url}/>
                </div>

                <div className="border border-color-accent border-t-0 mb-3"></div>

                <p className="text-sm font-bold mb-3">Synopsis :</p>
                <p className="text-sm text-justify mb-3">{anime.synopsis ? anime.synopsis : "No synopsis."}</p>

                <div className="border border-color-accent border-t-0 mb-3"></div>
                
                <div className="flex justify-between items-center">
                    <p className="text-sm text-justify font-bold mb-3">Comments :</p>
                    {!user &&
                        <p className="text-xs text-color-zinc-400 flex items-center gap-1">
                            <Link href="/api/auth/signin" className="items-center transition-all hover:text-color-dark hover:font-bold rounded-lg py-1.5 underline">
                                Sign In
                            </Link> 
                            to add your reviews
                        </p>
                    }
                    
                </div>
                
                <CommentBox anime_mal_id={id}/>

                
                {/* Comment input for user only */}
                {user &&
                    <>
                        <div className="border border-color-accent border-t-0 mt-5"></div>
                        <p className="text-sm text-justify font-bold my-3">Add your reviews :</p>

                        <CommentInput 
                        anime_mal_id={id}
                        user_email={user?.email} 
                        username={user?.name}
                        anime_title={anime.title}
                        user_image={user?.image}
                        />
                    </>
                }
                
            </div>
            </>
            )}
        </>
    )
}

export default Page