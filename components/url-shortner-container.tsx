'use client';

import React, { useState } from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function (){

    const [refreshKey, setRefreshKey] = useState(0);

    const handleUrlShortener = () => {
        setRefreshKey(prev => prev + 1);
    }

    return <div>
        <ShortenForm handleUrlShortener={handleUrlShortener}/>
        <UrlList key = {refreshKey} />
    </div>
}