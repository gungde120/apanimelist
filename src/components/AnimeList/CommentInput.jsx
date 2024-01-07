"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import ReactStars from "react-stars"
import fieldValidation from "../Utilities/fieldsValidation"

const CommentInput = ({anime_mal_id, user_email, username, anime_title, user_image}) => {
    const [comment, setComment] = useState("")
    const [isCreated, setIsCreated] = useState(false)
    const [star, setStar] = useState(0)

    const router = useRouter()
    
    const handleInput = (event) => {
        setComment(event.target.value)
    }

    const handleRating = (star) => {
        setStar(star)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = { anime_mal_id, user_email, comment, username, anime_title, user_image, star }

        if(fieldValidation(data)) {
            alert("You must add comment.")
            return
        }

        if (data.comment.length < 3) {
            alert(`Comment must be at least 3 characters long.`);
            return;
        }

        const response = await fetch("/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(data)
        })
        const submitComment = await response.json()
        if(submitComment.isCreated) {
            setIsCreated(true)
            setComment("")
            setStar(0)
            router.refresh()
        }
        return
    }

    return (
        <div className=" bg-color-primary rounded-lg flex flex-col gap-3 p-2">
            {(isCreated && star === 0) && <p className="text-sm px-1 text-center font-bold">Submitted!</p>}
            <ReactStars
            className="flex justify-center"
                count={5}
                onChange={handleRating}
                size={32}
                half={false}
                value={star}
                color2={'#ffd700'}
            />
            {star ?
                <div className="">
                    
                    <textarea 
                        className="h-32 w-full text-sm border border-color-dark py-2 px-3 rounded-lg " 
                        onChange={handleInput}
                        value={comment}
                        placeholder="Write your comment..."
                        minLength={3}
                        required
                    />

                    <button 
                        className="text-sm mt-1 items-center transition-all hover:shadow-lg hover:bg-color-dark hover:text-color-white border border-color-dark rounded-lg py-1 px-3"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            : null}
            
        </div>
    )
}

export default CommentInput