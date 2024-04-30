'use server'

import { prisma } from "@/lib/prisma";

export const getStockBySlug = async( slug: string ) => {
    try {
        const product = await prisma.product.findUnique({ 
            select: {
                inStock: true
            },
            where: { slug } 
        });

        if(!product) return null

        return product.inStock ?? 0
    } catch (error) {
        throw new Error("Error al obtener el producto");
    }
}