import { authUserSession } from "@/service/auth-service"
import Image from "next/image"
import Link from "next/link"

const Page = async() => {
    const user = await authUserSession()
    
    return (
        <>
            <div className="flex flex-col sm:flex-nowrap flex-wrap gap-3 p-3 items-center justify-center">
            <Image 
            src={user.image} alt="..."
            width={250}
            height={250}
            className="rounded-lg"
            />
            <div>
                <div className="font-bold text-lg">Your Profile</div>
                <div className="flex flex-row text-sm gap-3">
                    <div>
                        <div>User Name </div>
                        <div>Email </div>
                    </div>
                    <div>
                        <div> : {user.name}</div>
                        <div> : {user.email}</div>
                    </div>
                </div>
                
            </div>
            
        </div>
        
        <div className="flex flex-wrap gap-5 p-3 items-center justify-center">
            <Link 
                href="/users/dashboard/collection"
                className="hover:shadow-md border border-color-zinc-400 transition-all hover:bg-color-dark hover:text-color-white rounded-lg py-1.5 px-3"
            >My Collection</Link>
            <Link 
                href="/users/dashboard/comment"
                className="border border-color-zinc-400 transition-all hover:shadow-md hover:bg-color-dark hover:text-color-white rounded-lg py-1.5 px-3"
            >My Comment</Link>
        </div>
        </>
        
    )
}

export default Page