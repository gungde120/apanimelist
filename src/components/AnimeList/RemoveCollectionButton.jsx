"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const RemoveCollectionButton = ({ id, anime_mal_id, user_email }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter()

    const handleCollectionDelete = async (event) => {
        event.preventDefault();
        const data = { id, anime_mal_id, user_email };

        try {
            const response = await fetch("/api/v1/collection", {
                method: "DELETE",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.isDeleted) {
                    setIsDeleted(true);
                    router.refresh()
                }
            } else {
                console.error("Failed to delete collection:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting collection:", error);
        }
    };

    return (
        <>
            {isDeleted ? (
                <div className="py-2 px-2 text-xs bg-color-white rounded-lg">Removed from collection</div>
            ) : (
                <button
                    onClick={handleCollectionDelete}
                    className="transition-all shadow-md border border-color-accent hover:border-color-rose-500 bg-color-white hover:shadow-lg hover:bg-color-rose-500 hover:text-color-white rounded-lg text-xs py-2 px-2"
                >
                    Remove from collection
                </button>
            )}
        </>
    );
};

export default RemoveCollectionButton;
