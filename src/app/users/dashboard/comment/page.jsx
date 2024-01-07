import { authUserSession } from "@/service/auth-service"
import prisma from "@/service/prisma"
import Image from "next/image"
import Header from "@/components/AnimeList/Header"
import Link from "next/link"
import Back from "@/components/Dashboard/Header"
import CommentStars from "@/components/AnimeList/CommentStars"
import { timeAgo, formatDate} from "@/components/Utilities/dateTimeFormat"
import RemoveCommentButton from "@/components/UserComments/RemoveCommentButton"


const Page = async () => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({
        where: {
            user_email: user.email,
        },
        orderBy: {
            createdAt: 'desc',
        },
        
    });

    return (
        <>
        <section>
        <div className="flex justify-between items-center mb-4">
            <div className="">
                <Back title="Back"/>
            </div>
                    
            <Header className="" title="My Comments"/>
        </div>
        {comments.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
            {comments.map(comment => {
                const formattedTime = timeAgo(comment.createdAt)
                const formattedDate = formatDate(comment.createdAt)
                
                return (
                    <Link href={`/anime/${comment.anime_mal_id}`}  
                        key={comment.id}
                        className="hover:shadow-md flex flex-col text-wrap border border-color-zinc-400 hover:bg-gradient-to-r bg-color-primary from-color-primary via-gray-400 to-color-accent transition-all text-color-dark text-xs rounded-lg"
                    >
                        <div className="flex justify-between p-2 bg-color-white border border-color-zinc-400 rounded-t-lg border-l-0 border-r-0 border-t-0">
                            <p className="text-color-zinc-400">{formattedTime}</p>
                            <p className="text-color-zinc-400">{formattedDate}</p>
                            
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2 p-3 text-color-dark">
                                <p className="font-bold">{comment.anime_title}</p>
                                <div className="flex gap-2">
                                    <CommentStars star={comment.star}/>
                                    <p>({comment.star})</p>
                                </div>
                                
                                
                            </div>
                            <div className="p-3 transition-all">
                                <RemoveCommentButton
                                    id={comment.id}
                                    user_email={user.email}
                                />
                            </div>
                        </div>
                        
                        <div>
                            {comment.comment &&
                                <p className="border border-color-zinc-400 border-t-1 border-l-0 border-r-0 border-b-0 p-2 rounded-b-lg bg-color-white w-full text-sm">
                                    {comment.comment}
                                </p>
                            }
                        </div>
                        
                    </Link>
                )
            })}
        </div> 
        ) : (
            <div className="text-center justify-center flex items-center text-color-zinc-400 rounded-lg bg-color-primary h-screen w-full">
                <p>No added comments.</p>
            </div>
        )
        }

        </section>
        
        </>
        
    )
}

export default Page