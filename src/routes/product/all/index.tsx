import ProductCard from '@/components/Layout/ProductCard'
import ProductListLayout from '@/components/Layout/ProductList/ProductListLayout'

import { useSearchProducts } from '@/hooks/product.hooks'
import { createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import { CircleAlert } from 'lucide-react'

export const Route = createFileRoute('/product/all/')({
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
  const {data: products} = useSearchProducts({})
  


  const totalProducts = products?.paginationData?.total_items || 0;
  const limit =  products?.paginationData?.limit || 1;
  const totalPages = products?.paginationData?.total_pages|| Math.ceil(totalProducts / limit)

  function onPageChange(newPage: number){
    if(newPage < 1 || newPage > totalPages || newPage === page) return;

    navigate({
      to:'/product/all',
      search: (old) =>{
        const params = new URLSearchParams(old);
        params.set('page', newPage.toString())
        return params.toString()
      }
    })
  }

  return(
      <ProductListLayout heading={"All Products"} currentPage={page} totalPages={totalPages} onPageChange={onPageChange}>
        {
          products?.data.products.length ? 
          products?.data.products.map((product)=>
            <Link to={'/product/$id'} params={{id: product._id}} key={product._id}>
              <ProductCard productInfo={product}/>
            </Link>
          )
          :
          <div className='w-full h-screen-minus'>
              <div className='flex flex-col items-center justify-center h-full gap-space-10'>
                <CircleAlert size = {200} className='text-ternary-color'/>
                <h1 className='text-ternary-color'>No Product Found.</h1>
              </div>
          </div>
      }
      </ProductListLayout>
  )
}
