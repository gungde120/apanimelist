"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CollectionButton = ({ anime_mal_id, user_email, anime_image, anime_title }) => {
    const [isCreated, setIsCreated] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter()

    const handleAddCollection = async (event) => {
        event.preventDefault();
        const data = { anime_mal_id, user_email, anime_image, anime_title };

        try {
            const response = await fetch("/api/v1/collection", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                if (result.isCreated) {
                    setIsCreated(true);
                    router.refresh()
                } else {
                    setError("Failed to add collection");
                    setIsCreated(false);
                }
            } else {
                setError(`Failed to add collection: ${response.status} ${response.statusText}`);
                setIsCreated(false);
            }
        } catch (error) {
            console.error("Error adding collection:", error);
            setError("Error adding collection. Please try again.");
            setIsCreated(false);
        }
    };

    return (
        <>
            {isCreated ? (
                <div className="py-2 px-2 text-xs bg-color-white rounded-lg">Added to collection</div>
            ) : (
                <>
                    {error && <div className="text-red-500">{error}</div>}
                    <button
                        onClick={handleAddCollection}
                        className="transition-all shadow-md border border-color-accent hover:border-color-sky-500 bg-color-white hover:shadow-lg hover:bg-color-sky-500 hover:text-color-white rounded-lg text-xs py-2 px-2"
                    >
                        Add to collection
                    </button>
                </>
            )}
        </>
    );
};

export default CollectionButton;
