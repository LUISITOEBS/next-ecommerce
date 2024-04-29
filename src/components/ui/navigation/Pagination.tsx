'use client'

import { generatePaginationNumber } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props{
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number( searchParams.get('page') ? searchParams.get('page') : 1 ) ?? 1;

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams );

        if( pageNumber === '...' ){
            return `${ pathName }?${ params.toString() }`
        }

        if( +pageNumber <= 0 ){
            return  `${ pathName }`
        }

        if( +pageNumber >  totalPages){
            return `${ pathName }?${ params.toString() }`
        }

        params.set('page', pageNumber.toLocaleString())
        return  `${ pathName }?${ params.toString() }`;
    }

    const pagination = generatePaginationNumber( currentPage, totalPages );

    createPageUrl(1);

    return (
        <div className="flex text-center justify-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={ createPageUrl(currentPage - 1) }
                        >
                            <IoChevronBackOutline />
                        </Link>
                    </li>
                    {
                        pagination.map(( page, index ) => (
                            <li key={ index } className="page-item">
                                <Link
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {"bg-blue-600 text-white shadow-sm hover:bg-blue-400 hover:text-white": currentPage === page }
                                        )
                                    }
                                    href={ createPageUrl(page) }
                                >
                                    { page }
                                </Link>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={ createPageUrl(currentPage + 1) }
                        >
                            <IoChevronForwardOutline />
                        </Link>
                    </li>


                </ul>
            </nav>
        </div>
    )
}
