import prisma from '@/service/prisma';
import CollectionButton from './CollectionButton'; // Make sure to replace this with the correct path
import RemoveCollectionButton from './RemoveCollectionButton';
import { authUserSession } from '@/service/auth-service';

const ShowCollectionButton = async ({anime, user}) => {
    const collection = await prisma.collection.findFirst({
        where: { user_email: user.email, anime_mal_id: anime.mal_id.toString() },
        });

        return (
            
            <>
                {collection ? (
                    // Render "Remove" button if there is a collection
                    <>
                        <div className="mb-3">
                            <RemoveCollectionButton
                                id={collection.id}
                                anime_mal_id={anime.id}
                                user_email={user.email}
                            />
                        </div>
                    </>
                ) : (
                    // Render "Add to Collection" button if there is no collection
                    <>
                        <div className="mb-3">
                            <CollectionButton
                                anime_mal_id={anime.mal_id.toString()}
                                user_email={user.email}
                                anime_image={anime.images.jpg.large_image_url}
                                anime_title={anime.title}
                            />
                        </div>
                    </>
                )}
            </>


        )
        
    };

export default ShowCollectionButton;
