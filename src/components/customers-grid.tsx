"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

const query = `*[_type=="users"]{ 
  _id,
  name,
  email,
  image,
  orders,
  _createdAt
}`;

export default function CustomersGrid() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  useEffect(() => {
    client.fetch(query).then((data:any) => setUsers(data));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="space-y-8 p-8 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Customers ({users.length})
        </h1>
        <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
          Export
        </Button>
      </div>
      <div className="relative w-full sm:w-96 mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-10 w-full" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentUsers.map((user:any) => (
          <Card key={user._id} className="relative p-6 shadow-lg rounded-2xl  dark:bg-gray-100 overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2">
            <CardHeader className="p-0 border-b pb-4 flex items-center space-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-purple-500">
                <Image src={user.image} alt={user.name} fill className="object-cover" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-400 dark:text-white">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="font-semibold text-lg">{user.orders.length}</p>
              </div>
              <Badge variant={user.orders.length > 0 ? "default" : "destructive"} className="w-full justify-center py-1 text-md bg-red-500 rounded">
                {user.orders.length > 0 ? "Active" : "Inactive"}
              </Badge>
            </CardContent>
            <CardFooter className="border-t p-4 text-center">
              <p className="text-xs text-muted-foreground">Joined: {new Date(user._createdAt).toLocaleDateString()}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
        <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
