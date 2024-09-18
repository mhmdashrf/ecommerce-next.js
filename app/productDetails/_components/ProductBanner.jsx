import Image from 'next/image'
import React from 'react'

function ProductBanner({product}) {
  return (
    <div>
    {product?.attributes?.banner?.data?.attributes?.url ?   <Image src={product?.attributes?.banner?.data?.attributes?.url} alt='product-details-banner' 
      width={470} height={400} className="rounded-lg"
  
      /> :    
    <div className='w-[450px] h-[250px] bg-slate-200 rounded-lg animate-pulse'></div>
}
    </div>
  )
}

export default ProductBanner
