'use client'
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import SkeletonProductInfo from './SkeletonProductInfo'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '../../_utils/CartApis';
import { CartContext } from '../../_context/CartContext';


function ProductInfo({product}) { 
  const {user} = useUser();
  const router = useRouter()
  const {cart,setCart} = useContext(CartContext);

  const handleAddToCart = ()=> {
 if(!user){
  router.push('/sign-in');
 }else{
  const data = {
    data: {
      userName: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      products: [product?.id]
    }
  }
  CartApis.addToCart(data).then(res =>{
    console.log('cart created successfully',res.data.data);
    setCart(oldCart=>[
      ...cart,
      {
        id:res?.data?.data?.id,
        product
      }
    ])
  })
 }
  }
  return (
    <div>
        {product?.id ?    <div>
     <h2 className='text-[25px]'>{product?.attributes?.title}</h2>
     <h2 className='text-[15px]  text-gray-400'>{product?.attributes?.category}</h2>  
     <h2 className=' text-[15px] mt-3'>{product?.attributes?.description[0]?.children[0].text}</h2>
     <h2 className='text[11px] text-gray-500 flex gap-2 mt-2 items-center'>{product?.attributes?.
      instaDelivery ? <BadgeCheck className='text-green-500 h-5 w-5 '/> : <AlertOctagon />
        }Eligible For Instant Delivery</h2>

     <h2 className='text-[32px] text-primary mt-3'>$ {product?.attributes?.price}</h2>
     <button onClick={()=> handleAddToCart()} className='flex gap-2 bg-primary hover:bg-teal-600 p-3 rounded-lg text-white'><ShoppingCart/> Add To Cart</button>
    </div> :  <SkeletonProductInfo/>}
     
    </div>
  )
}

export default ProductInfo
