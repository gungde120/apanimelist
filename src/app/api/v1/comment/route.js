import prisma from "@/service/prisma"

export async function POST(request) {
    const {
        anime_mal_id, 
        user_email, 
        comment,
        username,
        anime_title,
        user_image,
        star
    } = await request.json()
    
    const data = {
        anime_mal_id, 
        user_email,
        comment,
        username,
        anime_title,
        user_image,
        star
    }

    //create a data
    const createComment = await prisma.comment.create({data})
    if(!createComment) return Response.json({status: 500, isCreated: false})
    else return Response.json({status: 200, isCreated:true})
}

export async function DELETE(request) {
    try {
        console.log("DELETE request received:", request.body);

        const { id, user_email } = await request.json();
        console.log("DELETE request data:", { id, user_email });

        // Delete a data based on anime_mal_id and user_email
        const deleteComment = await prisma.comment.delete({
            where: {
                id,
                user_email,
            },
        });

        console.log("DELETE operation result:", deleteComment);

        if (!deleteComment) {
            console.error("Error deleting comment: No record found");
            return Response.json({ status: 404, isDeleted: false, error: "No record found" });
        } else {
            console.log("Comment deleted successfully");
            return Response.json({ status: 200, isDeleted: true });
        }
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return Response.json({ status: 500, isDeleted: false, error: error.message });
    }
}