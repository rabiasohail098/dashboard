"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isClient, setIsClient] = useState(false); // Track if it's on the client-side

  useEffect(() => {
    setIsClient(true); // Set to true once the component has mounted on the client-side
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(
          `*[_type == "foods" && name match $searchQuery]{
            _id,
            imagePath,
            description,
            price,
            name,
            category,
            discountPercentage,
            isFeaturedProduct,
            stockLevel
          }`,
          { searchQuery: `*${query}*` }
        );
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (query.length > 2) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isClient) {
    return null; // Ensure the component only renders after mounting on the client-side
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search Results */}
      {results.length > 0 && (
        <ul className="mt-4 bg-white shadow-lg rounded-lg">
          {results.map((item: { 
            _id: string; 
            name: string; 
            imagePath: string; 
            price: number; 
            description: string; 
            category: string; 
            discountPercentage: number 
          }) => (
            <li key={item._id} className="p-4 border-b last:border-none flex space-x-4">
              {/* Product Image */}
              {item.imagePath && (
                <Image
                  src={item.imagePath} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                  width={64} // Optional: specify width and height for next/image
                  height={64}
                />
              )}

              {/* Product Details */}
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-green-600 font-semibold">${item.price}</p>
                <p className="text-blue-500 text-sm">Category: {item.category}</p>
                {item.discountPercentage > 0 && (
                  <p className="text-red-500 text-sm">
                    Discount: {item.discountPercentage}%
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
