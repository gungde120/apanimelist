"use client"

import { useRouter } from "next/navigation"; // Corrected import
import { useState } from "react";
import { Trash } from "@phosphor-icons/react";

const RemoveCommentButton = ({ id, user_email }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter();

    const handleCommentDelete = async (event) => {
        event.preventDefault();

        // Display confirmation alert
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
        if (!confirmDelete) {
            return; // If user clicks "Cancel", do nothing
        }

        const data = { id, user_email };

        try {
            const response = await fetch("/api/v1/comment", {
                method: "DELETE",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.isDeleted) {
                    setIsDeleted(true);
                    router.refresh();
                }
            } else {
                console.error("Failed to delete comment:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <>
            {isDeleted ? (
                <div className="py-2 px-2">Comment removed</div>
            ) : (
                <button
                    onClick={handleCommentDelete}
                    className="transition-all shadow-md border border-color-accent hover:border-color-rose-500 bg-color-white hover:shadow-lg hover:bg-color-rose-500 hover:text-color-white rounded-lg text-xs py-2 px-2"
                >
                    <Trash size={24} />
                </button>
            )}
        </>
    );
};

export default RemoveCommentButton;
