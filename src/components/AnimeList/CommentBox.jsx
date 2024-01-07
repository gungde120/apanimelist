import prisma from "@/service/prisma"
import Image from "next/image";
import CommentStars from "./CommentStars";
import { timeAgo, formatDate} from "@/components/Utilities/dateTimeFormat"

const CommentBox = async ({ anime_mal_id }) => {
    const comments = await prisma.comment.findMany({
        where: {
            anime_mal_id
        }
    });

    if (!comments || comments.length === 0) {
        // No comments, you can return null or render a message here
        return (
            <div className="text-center text-xs text-color-zinc-400 p-2 rounded-lg bg-color-primary flex flex-col gap-3 max-h-72 overflow-auto">
                <p>No Comments</p>
            </div>
        )
    }

    return (
        <div className="">
            <div className="shadow-[inset_-12px_-8px_40px_#46464620] relative p-2 rounded-lg bg-color-primary flex flex-col max-h-80 overflow-auto"
            >   
                
                {comments.map(comment => {
                    const formattedTime = timeAgo(comment.createdAt)
                    const formattedDate = formatDate(comment.createdAt)
                    return (
                    <div key={comment.id}
                        className="text-color-dark text-xs rounded-lg "
                    >      
                        <div className="flex flex-row gap-3 p-3 border border-b-1 border-t-0 border-l-0 border-r-0 border-color-accent bg-color-white">
                            <Image
                                src={comment.user_image}
                                alt={comment.user_image}
                                width={32}
                                height={32}
                                className="rounded-full h-10 w-10"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold">{comment.username}</p>
                                <div className="flex gap-2">
                                    <CommentStars star={comment.star}/>
                                    <p>({comment.star})</p>
                                </div> 
                                <div className="mt-2 text-sm">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                            <div className="absolute right-6 text-right">
                                <p className="text-color-zinc-400">{formattedTime}</p>
                                <p className="text-color-zinc-400">{formattedDate}</p>
                            </div>
                            
                        </div> 
                </div>
                )
                })}
            </div>
        </div>
    )
}

export default CommentBox