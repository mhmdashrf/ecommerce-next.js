import React from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

function ProductList({ productList }) {
  return (
    <>
      <motion.div
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 gap-3 "
      >
        {productList.map((item) => (
          <Link
            href={`/productDetails/${item?.id}`}
            className="p-1 hover:border hover:shadow-md border-teal-200 rounded-lg hover:cursor-pointer"
            key={item.id}
          >
            <Image
              src={item?.attributes?.banner?.data?.attributes?.url}
              alt="banner-card"
              width={400}
              height={350}
              className="rounded-t-lg h-[200px] object-cover"
            />
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-b-lg">
              <div>
                <h2 className=" text-[14px] font-medium line-clamp-1 text-black">
                  {item?.attributes?.title}
                </h2>

                <h2 className="text-[12px] text-gray-400 flex gap-1 items-center">
                  <List className="h-4 w-3" /> {item?.attributes?.category}
                </h2>
              </div>
              <h2 className="text-black">{item?.attributes?.price}</h2>
            </div>
          </Link>
        ))}
      </motion.div>
    </>
  );
}

export default ProductList;
