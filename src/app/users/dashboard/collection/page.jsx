import Header from "@/components/AnimeList/Header"
import Link from "next/link"
import Image from "next/image"
import Header1 from "@/components/Dashboard/Header"
import prisma from "@/service/prisma"
import { authUserSession } from "@/service/auth-service"
import { timeAgo, formatDate} from "@/components/Utilities/dateTimeFormat"

const Page = async () => {
    const user = await authUserSession()

    // Find all collection from a user
    const collection = await prisma.collection.findMany(
        { where: { user_email: user.email },
    });

    return (
        <>
            <section>
                <div className="flex justify-between items-center mb-4">
                    <div className="">
                        <Header1 title="Back"/>
                    </div>
                    
                    <Header className="" title="My Collection"/>
                </div>

                {collection.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 grid-cols-2 gap-4">
                    {collection.map((collect, index) => {
                        const formattedTime = timeAgo(collect.createdAt)
                        const formattedDate = formatDate(collect.createdAt)

                        return (
                            <Link key={index} href={`/anime/${collect.anime_mal_id}`} 
                                className="">
                                <div className="hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg transition-all">
                                    <div className="relative hover:font-bold text-xs transition-all">
                                        <Image 
                                            src={collect.anime_image} 
                                            alt={collect.anime_image} 
                                            width={350}
                                            height={350}
                                            className="w-full rounded-t-lg border border-color-dark"
                                        />
                                        
                                        <div className="w-full absolute bg-gradient-to-t from-color-dark bottom-0 left-0 h-24 flex flex-col items-center justify-end">
                                            <h3 className="text-color-white p-3">{collect.anime_title}</h3>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full bg-color-dark text-color-white border border-t-1 border-l-0 border-r-0 border-b-0 border-color-zinc-400 rounded-b-lg flex flex-col items-center">
                                        <h3 className="text-xs p-2">Added {formattedTime}</h3>
                                        <h3 className="text-xs pb-2 text-color-zinc-400">{formattedDate}</h3>
                                    </div>
                                </div>
                                
                            </Link>
                        )
                    })}
                    
                </div>
                ) : (
                    <div className="text-center justify-center flex items-center text-color-zinc-400 rounded-lg bg-color-primary  h-screen w-full">
                        <p>No added collections.</p>
                    </div>
                ) }
                
                
            </section>
        </>
        
    )
}

export default Page