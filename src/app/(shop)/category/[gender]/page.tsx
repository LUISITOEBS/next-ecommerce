export const revalidate = false

import { notFound } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: {
    gender: Category;
  },
  searchParams: {
    page?: string;
    take?: string;
  }
}



export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;

  console.log( gender );
  

  const labels: Record<Category, string> = { 
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "Niños",
    "unisex": "Todos"
  }

  if( !labels[gender] ) {
    notFound()
  }

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const take = searchParams.take ? parseInt( searchParams.take ) : 12;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, take, gender });

  return (
    <div>
      <Title title={ labels[gender] } subtitle={`Productos de ${ labels[gender] }`} className="mb-2" />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </div>
  );
}