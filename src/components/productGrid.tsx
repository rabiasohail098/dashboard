"use client"

import { useEffect, useState } from "react"
import { Edit, Search, Trash } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditProductDialog } from "./edit-product-dialog"
import { CreateProductDialog } from "./create-product-dialog"
import { Product, productCreateSanity, productDeleteSanity, productPostSanity, sanityFetch } from "@/services/sanityApi"

export default function ProductsGrid() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [createProduct, setCreateProduct] = useState<Product | null>(null)
  const [isChange, setIsChange] = useState<boolean>(false)
  const [productArray, setProductsArray] = useState<Product[]>([])
  const [showProductArray, setShowProductArray] = useState<Product[]>([])
  const [search, setSearch] = useState<string>("")
  const [categoryDropdown, setCategoryDropdown] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 6 // Adjust this to the number of items per page you want

  // Fetch products from Sanity
  useEffect(() => {
    async function getData() {
      let query = '*[_type == "foods"]'

      if (search) {
        query = `*[_type == "foods" && productName match "${search}*"]`
      }

      const res = await sanityFetch(query)
      setProductsArray(res)
      setShowProductArray(res.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))
      setCategoryDropdown([...new Set(res.map((item: any) => item.category))])
    }

    getData()
  }, [search, isChange, currentPage])

  // Pagination - change page
  const paginate = (page: number) => {
    setCurrentPage(page)
    setShowProductArray(
      productArray.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    )
  }

  // Handle category selection
  function valueChangeCategory(value: string) {
    if (value !== "all") {
      setShowProductArray(
        productArray.filter((item) => item.category === value)
      )
    } else {
      setShowProductArray(productArray)
    }
  }

  // Handle price sorting
  function valueChangePrice(value: string) {
    const updatedArray = [...showProductArray]

    if (value === "low") {
      setShowProductArray(updatedArray.sort((a, b) => a.price - b.price))
    } else if (value === "high") {
      setShowProductArray(updatedArray.sort((a, b) => b.price - a.price))
    }
  }

  // Save edited product
  const handleSaveProduct = async (updatedProduct: Product) => {
    const res = await productPostSanity(updatedProduct)
    if (res) {
      setIsChange(!isChange)
    }
  }

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    const res = await productDeleteSanity(productId)
    if (res) {
      setIsChange(!isChange)
    }
  }

  // Create new product
  const handleCreateProduct = async (updatedProduct: Product) => {
    try {
      const res = await productCreateSanity(updatedProduct)
      if (res) {
        setIsChange(!isChange)
        setCreateProduct(null)
      }
    } catch (error) {
      console.error("Creation failed:", error)
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Products ({productArray.length})</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline">Export</Button>

          <Button variant="outline" onClick={(e) => { e.stopPropagation(); setCreateProduct({
            _id: '',
            productName: '',
            price: 0,
            inventory: 0,
            category: '',
            description: '',
            imageUrl: '',
            stockLevel: 0,
            color: '',
          }) }}>
            Create new
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 max-w-sm"
            value={search}
            onChange={(e: any) => { setSearch(e.target.value) }}
          />
        </div>

        <Select defaultValue="all" onValueChange={valueChangeCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryDropdown.map((option, index) => (
              <SelectItem value={option} key={index}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="latest" onValueChange={valueChangePrice}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest Added</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showProductArray.map((product) => (
          <Card
            key={product._id}
            className="cursor-pointer transition-shadow hover:shadow-lg overflow-hidden"
          >
            <CardHeader className="border-b p-0">
              <div className="aspect-square relative">
              <Image
                src={product.imageUrl || "/placeholder.svg"} // Correct image URL
                alt={product.productName}
                 fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1">{product.productName}</CardTitle>
              <p className="text-lg font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground mt-1">Stock Level: {product.stockLevel}</p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => { e.stopPropagation(); setEditingProduct(product) }}
                >
                  <Edit className="mr-2" />
                  Edit
                </Button>
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product._id) }}
                >
                  <Trash className="mr-2" />
                  Delete
                </Button> */}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: Math.ceil(productArray.length / itemsPerPage) }).map((_, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "bg-blue-500 text-white" : ""}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={true}
          onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
          onSave={handleSaveProduct}
          categoryDropdown={categoryDropdown}
        />
      )}

      {createProduct && (
        <CreateProductDialog
          product={createProduct}
          open={true}
          onOpenChange={(open: boolean) => !open && setCreateProduct(null)}
          onSave={handleCreateProduct}
          categoryDropdown={categoryDropdown}
        />
      )}
    </div>
  )
}
