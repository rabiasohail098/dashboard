"use server";

import { client } from "@/sanity/lib/client";

export interface Product {
  _id: string;
  productName: string;
  price: number;
  inventory: number;
  category: string;
  description: string;
  imageUrl: string;
  stockLevel: number;
  color: string;
}
// Product Interface
// export interface Product {
//   _id: string;
//   productName: string;
//   description: string;
//   price: number;
//   imagePath: string;
//   discountPercentage: number;
//   isFeaturedProduct: boolean;
//   stockLevel: number;
//   category: string;
//   inventory: number;
 
// }

//----------------------------------------------- Fetch Products from Sanity
export async function sanityFetch(query: string): Promise<Product[]> {
  try {
    const res: Product[] = await client.fetch(`
      *[_type == "foods"] {
         _id,
         title,
         category,
         price,
         "imageUrl": image.asset->url, // Fetching image URL correctly
         description,
         available,
         tags
      }
    `);
    return res;
  } catch (error) {
    console.error("Error fetching products from Sanity:", error);
    throw error;
  }
}

//----------------------------------------------- Upload Image to Sanity
async function uploadImageToSanity(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

    const blob = await response.blob();
    const asset = await client.assets.upload("image", blob);

    return asset;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}

// Interface for Sanity Return Data
export interface IReturnSanityProduct {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  category: string;
  colors: string[];
  description: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  inventory: number;
  price: number;
  productName: string;
  status: string;
}

//----------------------------------------------- Update Product in Sanity
export async function productPostSanity(updatedProduct: Product) {
  try {
    const imageAsset = await uploadImageToSanity(updatedProduct.imageUrl);

    const res = await client
      .patch(updatedProduct._id)
      .set({
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        productName: updatedProduct.productName,
        price: updatedProduct.price,
        category: updatedProduct.category,
        inventory: updatedProduct.inventory,
        description: updatedProduct.description,
      })
      .commit();

    return res;
  } catch (error) {
    console.error("Error updating product in Sanity:", error);
    throw error;
  }
}

//----------------------------------------------- Delete Product from Sanity
export async function productDeleteSanity(productId: string) {
  try {
    const res = await client.delete(productId);
    return res;
  } catch (error) {
    console.error("Error deleting product from Sanity:", error);
    throw error;
  }
}

//----------------------------------------------- Create New Product in Sanity
export async function productCreateSanity(newProduct: Product) {
  try {
    const res = await client.create({
      _type: "product",
      productName: newProduct.productName,
      price: newProduct.price,
      category: newProduct.category,
      inventory: newProduct.inventory,
      description: newProduct.description,
      status: "active",
      colors: [],
    });

    console.log("✅ Product created successfully:", res._id);
    return res;
  } catch (error) {
    console.error("😡 Product creation failed:", error);
    throw error;
  }
}
