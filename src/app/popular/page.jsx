"use client"

import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "@/service/api-service";

const Page = () => {
    const [page, setPage] = useState(1);
    const [topAnime, setTopAnime] = useState([]);

    const fetchData = async () => {
        const popularAnime = await getAnimeResponse(`top/anime`, `page=${page}`);
        setTopAnime(popularAnime);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div>
            <HeaderMenu title={`List of popular anime page ${page}`} />
            <AnimeList api={topAnime}/>
            <Pagination page={page} lastPage={topAnime.pagination?.last_visible_page} setPage={setPage} />
        </div>
    );
};

export default Page;
