"use client"

const { Star } = require("@phosphor-icons/react/dist/ssr")

const CommentStars = ({star}) => {
    return (
        <>
            <div className="flex">
                {[...Array(star)].map((_, index) => (
                    <Star key={index} size={16} color="#fde047" weight="fill" />
                ))}
            </div>

        </>
    )
}

export default CommentStars