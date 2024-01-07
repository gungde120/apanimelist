"use client"

import { YoutubeLogo } from "@phosphor-icons/react"
import { XCircle } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"
import YouTube from "react-youtube"
import Image from "next/image"

const VideoPlayer = ({ youtubeId, thumbnail }) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleVideoPlayer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const option = {
        width: "360",
        height: "240"
    }

    const Player = () => {
        return (
            // <div className="fixed bottom-0 right-0"></div>
            <div className="fixed bottom-0 right-0 z-10">
                <button 
                    onClick={handleVideoPlayer}
                    className="float-right p-2">
                    <XCircle size={32} weight="fill"/>
                </button>
                <YouTube 
                    videoId={youtubeId}
                    onReady={(event) => event.target.pauseVideo()}
                    opts={option}
                    onError={() => alert("Sorry the video is unavailable :)")}
                />
            </div>
        )
    }

    const Thumbnail = () => {
        if(thumbnail) {
            return (
                <div onClick={handleVideoPlayer} className="hover:font-bold transition-all">
                    <div className="relative cursor-pointer ">
                    <div className=" p-2 absolute text-color-white flex justify-center items-center">
                        <p className="text-xs">Play Trailer</p>                
                    </div>
                    <div className="w-full lg:w-64 md:w-64 sm:w-64 p-1 absolute inset-0 text-color-white flex justify-center items-center transition-all ">
                        <YoutubeLogo className="" size={64} color="#ef4444" weight="fill" />
                    </div>
                    <Image 
                    className="rounded-lg w-full lg:w-64 md:w-64 sm:w-64"
                    src={thumbnail}
                    width={400} 
                    height={300}
                    alt="Thumbnail Unavailable"
                    />
                    </div>
                </div>
            )
        }
        else {
            return 
            // (
            //     <>
            //         <div className="relative cursor-pointer">
            //         <div className=" p-2 absolute flex justify-center items-center">
            //             <p className="text-xs">Trailer Unavailable</p>                
            //         </div>
            //         <div className=" p-1 absolute inset-0 text-color-white flex justify-center items-center transition-all">
            //             <YoutubeLogo className="" size={64} color="#ef4444" weight="fill" />
            //         </div>
            //         </div>
            //     </>
            // )
        }
        
    }

    return isOpen ? <Thumbnail/> : <Player/>
}

export default VideoPlayer