'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props{
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [isLoading, setisLoading] = useState(true);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        getStockBySlug( slug ).then( res => {
            setisLoading( false );
            setStock( res as number );
        })
    }, []);

    return (
        <>
            {
                isLoading 
                ? 
                    (
                        <h1 className={` ${titleFont.className} antialiased font-bold text-md bg-gray-200 animate-pulse`}>
                            &nbsp;
                        </h1>
                    )
                : (
                    <h1 className={` ${titleFont.className} antialiased font-bold text-md`}>
                        Stock: { stock }
                    </h1>
                )
            }
        </>

    )
}
