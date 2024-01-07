import prisma from "@/service/prisma"

export async function POST(request) {
    const {
        anime_mal_id, 
        user_email, 
        anime_image, 
        anime_title
    } = await request.json()
    
    const data = {
        anime_mal_id, 
        user_email,
        anime_image,
        anime_title,
    }

    //create a data
    const createCollection = await prisma.collection.create({data})
    if(!createCollection) return Response.json({status: 500, isCreated: false})
    else return Response.json({status: 200, isCreated:true})
}

export async function DELETE(request) {
    try {
        console.log("DELETE request received:", request.body);

        const { id, anime_mal_id, user_email } = await request.json();
        console.log("DELETE request data:", { id, anime_mal_id, user_email });

        // Delete a data based on anime_mal_id and user_email
        const deleteCollection = await prisma.collection.delete({
            where: {
                id,
                anime_mal_id,
                user_email,
            },
        });

        console.log("DELETE operation result:", deleteCollection);

        if (!deleteCollection) {
            console.error("Error deleting collection: No record found");
            return Response.json({ status: 404, isDeleted: false, error: "No record found" });
        } else {
            console.log("Collection deleted successfully");
            return Response.json({ status: 200, isDeleted: true });
        }
    } catch (error) {
        console.error("Error handling DELETE request:", error);
        return Response.json({ status: 500, isDeleted: false, error: error.message });
    }
}
