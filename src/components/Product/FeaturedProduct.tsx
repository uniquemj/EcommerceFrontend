import { useGetFeaturedProducts } from '@/hooks/product.hooks'
import React from 'react'
import ProductDisplay from '../Layout/ProductDisplay'
import ProductCard from '../Layout/ProductCard'
import { Link } from '@tanstack/react-router'

const FeaturedProduct = () => {
   const {data: featuredProduct} = useGetFeaturedProducts({page: 1, limit: 5})
  return (
    <ProductDisplay title="Featured Products" url='/'>
        
        {
            featuredProduct?.data.map((product)=>(
              <Link to={`/$id`} params={{id: product._id}}>
                <ProductCard productInfo={product}/>
              </Link>
            ))
        }
    </ProductDisplay>
  )
}

export default FeaturedProduct