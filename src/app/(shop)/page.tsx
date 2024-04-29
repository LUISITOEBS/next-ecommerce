export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props { 
  searchParams: {
    page?: string;
    take?: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const take = searchParams.take ? parseInt( searchParams.take ) : 12;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, take });

  if( products.length === 0 ){
    redirect('/')
  }

  return (
    <div>
      <Title title="Store" subtitle="All products" className="mb-2" />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </div>
  );
}
