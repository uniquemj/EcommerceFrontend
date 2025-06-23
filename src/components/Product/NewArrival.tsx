import React from 'react'
import ProductDisplay from '../Layout/ProductDisplay'
import { useSearchProducts } from '@/hooks/product.hooks'
import ProductCard from '../Layout/ProductCard'
import { Link } from '@tanstack/react-router'

const NewArrival = () => {

  const {data: newArrival} = useSearchProducts({page: 1, limit: 5, sortBy: '-createdAt'})

  console.log(newArrival)
  return (
    <ProductDisplay title="New Arrivals" url='/product/all/new-arrival'>
        {
            newArrival?.data.products.map((product)=>(
              <Link to={`/product/$id`} params={{id: product._id}}>
                <ProductCard productInfo={product}/>
              </Link>
            ))
        }
    </ProductDisplay>
  )
}

export default NewArrival