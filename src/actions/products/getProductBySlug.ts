'use server'
import { prisma } from "@/lib/prisma"

export const getProductBySlug = async( slug: string ) => {
    try {
        const product = await prisma.product.findUnique({ 
            include: {
                image: {
                    select: {
                        url: true
                    }
                }
            },
            where: { slug } 
        });

        if(!product) return null

        return {
            ...product,
            images: product.image.map( img => img.url )
        }
    } catch (error) {
        throw new Error("Error al obtener el producto");
        
    }
}