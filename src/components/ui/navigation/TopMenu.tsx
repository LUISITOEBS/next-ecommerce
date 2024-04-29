'use client';
import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {

    const opendSideMenu = useUIStore( state => state.opendSideMenu);
    const totalItems = useCartStore( state => state.getTotalItems() );

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded( true );
    }, []);
    

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* Logo */}
            <div>
                <Link href={'/'} title="Home Page">
                    <span className={ `${titleFont.className} antialiased font-bold` }>Toge</span>
                    <span> | Shop</span>
                </Link>
            </div>
            {/* Center Menu */}
            <div className="hidden sm:block">
                <Link href={'/category/men'} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Hombres
                </Link>
                <Link href={'/category/women'} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Mujeres
                </Link>
                <Link href={'/category/kid'} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Niños
                </Link>
            </div>

            {/* Buttons Search anf Cart */}
            <div className="flex items-center">
                <Link href={'/search'} className="mx-2">
                    <IoSearchOutline className="w-5 h-5"/>
                </Link>

                <Link 
                    href={
                        (loaded && (totalItems === 0))
                        ? '/empty'
                        : '/cart'
                    } 
                    className="mx-2"
                >
                    <div className="relative">
                        {
                            (loaded && totalItems > 0) &&  (
                                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    { totalItems }
                                </span>
                            )
                        }
                       
                        <IoCartOutline className="w-5 h-5"/>
                    </div>
                </Link>

                <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" onClick={ () => opendSideMenu() }>
                    Menú
                </button>
            </div>
        </nav>
    )
}
