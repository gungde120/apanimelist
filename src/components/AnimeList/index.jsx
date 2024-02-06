// components/AnimeList/AnimeList.jsx
import Image from 'next/image';
import Link from 'next/link';
import ShowCollectionButton from './ShowCollectionButton'; // Make sure to replace this with the correct path
import { Star } from '@phosphor-icons/react/dist/ssr';

const AnimeList = ({ api , user }) => {
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 pb-4">
        {api.data?.sort((a, b) => a.rank - b.rank).map((anime, index) => (
            <Link href={`/anime/${anime.mal_id}`} className="relative group" key={index}>
            {/* <div className="group-hover:opacity-100 opacity-0 absolute right-3 top-3 transition-all">
                {user &&  <ShowCollectionButton anime={anime} user={user}/>
                }
            </div> */}

            <div className="cursor-pointer transition-all hover:bg-color-dark hover:text-color-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
                <div className="flex flex-row justify-between">
                {anime.rank ? (
                    <p className="font-bold text-sm p-3">#{anime.rank !== null ? anime.rank : 'n/a'}</p>
                ) : null}
                {anime.score ? (
                    <p className="p-3 text-sm flex flex-row gap-1 items-center">
                    <Star size={16} color="#fde047" weight="fill" />
                    {anime.score}
                    </p>
                ) : null}
                </div>

                <Image
                className="rounded-lg w-full max-h-64 object-cover"
                src={anime.images.webp.image_url}
                alt="..."
                width={350}
                height={350}
                />


                <p className="text-xs font-bold pl-4 pr-3 py-3">{anime.title}</p>

                <div>
                {anime.episodes ? <p className="text-xs px-4">{anime.type} ({anime.episodes} eps)</p> : null}
                {anime.aired?.string ? <p className="text-xs px-4 pb-3">{anime.aired.string}</p> : null}
                </div>
            </div>
            </Link>
        ))}
        </div>
    );
};

export default AnimeList;
