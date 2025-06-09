import ProductCard from '@/components/Layout/ProductCard'
import ProductListLayout from '@/components/Layout/ProductList/ProductListLayout'
import { useSearchProducts } from '@/hooks/product.hooks'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/product/all/new-arrival')({
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
    const {data: newArrival} = useSearchProducts({page: 1, limit: 5, sortBy: '-createdAt'})
const totalProducts = newArrival?.paginationData?.total_items || 0;
  const limit =  newArrival?.paginationData?.limit || 1;
  const totalPages = newArrival?.paginationData?.total_pages|| Math.ceil(totalProducts / limit)

  function onPageChange(newPage: number){
    if(newPage < 1 || newPage > totalPages || newPage === page) return;

    navigate({
      to:'/product/all/feature-product',
      search: (old) =>{
        const params = new URLSearchParams(old);
        params.set('page', newPage.toString())
        return params.toString()
      }
    })
  }
  return (
    <ProductListLayout heading="New Arrivals" onPageChange={onPageChange} totalPages={totalPages} currentPage={page}>
        {
            newArrival?.data.products.map((product)=>(
              <Link to={`/product/$id`} params={{id: product._id}}>
                <ProductCard productInfo={product}/>
              </Link>
            ))
        }
    </ProductListLayout>
  )
}
