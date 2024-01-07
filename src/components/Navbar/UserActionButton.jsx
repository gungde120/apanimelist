import Link from "next/link"
import { authUserSession } from "@/service/auth-service"
import Image from "next/image"

export const UserActionButton = async() => {
    const user = await authUserSession()
    const actionLabel = user ? "Sign Out" : "Sign In"
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"

    return (
        <div className="flex justify-between gap-3">
            {user ? 
                <Link 
                className="flex items-center gap-3 border border-color-accent transition-all hover:shadow-md hover:bg-color-dark hover:text-color-white rounded-lg py-1.5 px-3"
                href="/users/dashboard">
                    <Image className="rounded-full" src={user.image}
                    alt="..."
                    width={24}
                    height={24}/>
                Profile
                </Link>
            : null}
            <Link href={actionURL} className="flex gap-2 items-center transition-all border border-color-accent hover:shadow-md bg-color-white hover:bg-color-dark hover:text-color-white rounded-lg py-1.5 px-3">
                {actionLabel}
            </Link>
        </div>
        
    )
}

export default UserActionButton