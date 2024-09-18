'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import ProductApis from '../_utils/ProductApis';

function productSection () {
    const [productList , setProductList] = useState ([]);
    useEffect(()=>{
        getLatestProduct_();
    },[])
    const getLatestProduct_= ()=>{
        ProductApis.getLatestProduct().then(res=>{
       console.log(res.data.data)
       setProductList(res.data.data)
        })
    }
  return <>
    <div className='px-10 md:px-20'>
    <h2 className='my-8 text-3xl'>Our Latest Products</h2>

    <ProductList productList={productList}/>
  
    </div>
    </>
}

export default productSection
