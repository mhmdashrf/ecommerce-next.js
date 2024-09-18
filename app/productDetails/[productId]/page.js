'use client'
import BreadCrumb from '../../_components/BreadCrumb';
import ProductApis from '../../_utils/ProductApis';
import React, { useEffect, useState } from 'react';
import ProductBanner from '../_components/ProductBanner';
import ProductInfo from '../_components/ProductInfo';
import ProductList from '../../_components/ProductList';
import { usePathname } from 'next/navigation';

function productDetails({ params }) {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductId_();
  }, [params?.productId])

  const getProductId_ = () => {
    ProductApis.getProductId(params?.productId).then((res) => {
      setProductDetails(res?.data?.data)
      getProductByCategory(res?.data?.data)
    })
  }

  const getProductByCategory = (product) => {
    ProductApis.getProductByCategory(product?.attributes?.category).then((res) => {
      console.log(res?.data?.data)
      setProductList(res?.data?.data)

    })
  }

  return (
    <div className='px-10 md:px-28 py-28'>
      <BreadCrumb path={path} />
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0 mt-10 justify-around lg:mt-5 '>
         <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} /> 
      </div>
      <div>
        <h2 className='mt-28 text-3xl mb-5'>Similar Products</h2>
        <ProductList productList={productList} />
      </div>

    </div>
  )
}

export default productDetails
