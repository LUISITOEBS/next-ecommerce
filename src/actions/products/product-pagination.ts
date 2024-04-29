'use server';

import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions{
    page?: number, 
    take?: number,
    gender?: string;
}

export const getPaginatedProductsWithImages = async({ page = 1, take = 12, gender = undefined }: PaginationOptions) => {
    if( isNaN( Number(page)) ) page = 1;
    if( page < 1 ) page = 1
    if( isNaN( Number(take)) ) take = 12;


    try {

        //Obtener el total de productos
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            where: {
                gender: (gender as Gender)
            },
            include: {
                image: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        });

        //Obtener el total de paginas
        const totalPages = await prisma.product.count({ where: { gender: (gender as Gender) } });

        return{
            currentPage: page,
            totalPages: Math.ceil( totalPages / take ),
            products: products.map( product => ({
                ...product,
                images: product.image.map( img => img.url )
            }))
        }
    } catch (error) {
        throw new Error('No se pudo cargar info de la base de datos')
    }
    
    
}