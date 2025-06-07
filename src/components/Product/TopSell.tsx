import React from 'react'
import ProductDisplay from '../Layout/ProductDisplay'
import { useGetBestSellProducts } from '@/hooks/product.hooks'
import ProductCard from '../Layout/ProductCard'
import { Link } from '@tanstack/react-router'

const TopSell = () => {
  const {data: bestSell} = useGetBestSellProducts({page: 1, limit: 5})
  return (
    <ProductDisplay title="Best Sellers" url='/'>
        
        {
            bestSell?.data.map((product)=>(
              <Link to={`/$id`} params={{id: product._id}}>
                <ProductCard productInfo={product}/>
              </Link>
            ))
        }
    </ProductDisplay>
  )
}

export default TopSell