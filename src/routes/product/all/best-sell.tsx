import ProductCard from '@/components/Layout/ProductCard'
import ProductListLayout from '@/components/Layout/ProductList/ProductListLayout'
import { useGetBestSellProducts } from '@/hooks/product.hooks'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/product/all/best-sell')({
  component: RouteComponent,
  loader: ({location})=>{
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page')) || 1;
    return {page}
  }
})

function RouteComponent() {
  const {page} = Route.useLoaderData();
    const navigate = useNavigate();
  const {data: bestSell} = useGetBestSellProducts({page: 1, limit: 5})
  const totalProducts = bestSell?.paginationData?.total_items || 0;
  const limit =  bestSell?.paginationData?.limit || 1;
  const totalPages = bestSell?.paginationData?.total_pages|| Math.ceil(totalProducts / limit)

  function onPageChange(newPage: number){
    if(newPage < 1 || newPage > totalPages || newPage === page) return;

    navigate({
      to:'/product/all/best-sell',
      search: (old) =>{
        const params = new URLSearchParams(old);
        params.set('page', newPage.toString())
        return params.toString()
      }
    })
  }
  return (
    <ProductListLayout heading={"Best Sellers"} currentPage = {page} totalPages={totalPages} onPageChange={onPageChange}>
        
        {
            bestSell?.data.map((product)=>(
              <Link to={`/product/$id`} params={{id: product._id}}>
                <ProductCard productInfo={product}/>
              </Link>
            ))
        }
    </ProductListLayout>
  )
}

