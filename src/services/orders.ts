"use server"

import { client } from "@/sanity/lib/client"

export async function cartFetchSanity(){
  const res = await client.fetch(`*[_type == 'order']{
  _id,
  name,
  status,
  totalAmount,
  _updatedAt,
  cartItems[] {
    _id,
    name,
    status,
    totalAmount
  }
}`)
 return res 
  
}