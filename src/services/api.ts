"use server"

import { client } from "@/sanity/lib/client";


export async function fetchData(){
  const response = await fetch("https://template-0-beta.vercel.app/api/product")
  const products = await response.json()

  for (const product of  products){

    const sanityProduct = {
      _type: 'product',
      _id: product.id,
      name: product.name,
      imagePath: product.imagePath,
      price: parseFloat(product.price),
      description: product.description,
      discountPercentage: product.discountPercentage,
      isFeaturedProduct: product.isFeaturedProduct,
      stockLevel: product.stockLevel,
      category: product.category,
    }

    await client.createOrReplace(sanityProduct)
  }
}


