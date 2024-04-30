import { initialData } from "./seed";
import { prisma } from '../lib/prisma';

async function main() {
    
    await prisma.user.deleteMany();
    await prisma.productImages.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    

    const { categories, products, users } = initialData;

    const categoriesData = categories.map( (name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesFromDb = await prisma.category.findMany();

    const categoriesMap = categoriesFromDb.reduce((map, category) => { 
        map[category.name.toLowerCase()] = category.id
        return map 
    }, {} as Record<string, string>);



    products.forEach( async (product) => {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                "category_id": categoriesMap[product.type]
            }
        });

        const imagesData = images.map(( image ) => ({
            url: image,
            product_id: dbProduct.id
        }));

        await prisma.productImages.createMany({
            data: imagesData
        });
    })
    
    await prisma.user.createMany({
        data: users
    });




    console.log('Se ha ejecutado el seed');
    
}

(() => {
    if( process.env.NODE_ENV === 'production' ) return;
    main();
})();