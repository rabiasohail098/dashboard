"use client";

import { useEffect, useState } from "react";
import { 
  Search, CheckCircle2, Clock, Truck, XCircle, ArrowRight, 
  User, CalendarDays, Package 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

interface Order {
  _id: string;
  name: string;
  date: string;
  status: OrderStatus;
  total: number;
  cartitems: { _id: string; name: string; status: string; totalAmount: number }[];
}

const query = `*[_type == "order"]{
  _id,
  name,
  status,
  totalAmount,
  _updatedAt,
  cartItems[]->{
    _id,
    name,
    status,
    totalAmount
  }
}`;

type OrderStatus = "success" | "pending" | "processing" | "cancelled";

const statusIcons: Record<OrderStatus, typeof CheckCircle2> = {
  success: CheckCircle2,
  pending: Clock,
  processing: Truck,
  cancelled: XCircle,
};

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const fetchedOrders = await client.fetch(query);
        console.log("Fetched Orders:", JSON.stringify(fetchedOrders, null, 2)); // Debugging
  
        if (!Array.isArray(fetchedOrders)) {
          throw new Error("Invalid Data Format");
        }
  
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Empty array set kardo taake crash na ho
      }
    }
    fetchOrders();
  }, []);
  return (
    <div className="space-y-6 p-6  min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Orders ({orders.length})
        </h1>
        <Button variant="outline" className="gap-2">Export</Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10 w-full" />
        </div>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="fulfilled">Fulfilled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          return (
            <Card 
              key={order._id} 
              className={cn("shadow-md transition-all duration-300 border rounded-xl  overflow-hidden hover:shadow-xl")}
            >
              <CardHeader className=" p-4 border-b">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <StatusIcon className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-400">Order #{order._id}</span>
                </CardTitle>
                <Badge className={cn("text-sm font-medium capitalize px-3 py-1 rounded-full", {
                  "bg-green-100 text-green-700 border-green-200": order.status === "success",
                  "bg-yellow-100 text-yellow-700 border-yellow-200": order.status === "pending",
                  "bg-blue-100 text-blue-700 border-blue-200": order.status === "processing",
                  "bg-red-100 text-red-700 border-red-200": order.status === "cancelled",
                })}>
                  {order.status}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-bold text-gray-400">{order.name ?? "Unknown"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {order.date ? new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "No Date"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{order.cartitems?.length ?? 0} item{order.cartitems?.length !== 1 ? "s" : ""}</span>
                </div>
              </CardContent>

              <CardFooter className="border-t p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-gray-400">${order.total ? order.total.toFixed(2) : "0.00"}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 text-gray-400 hover:bg-gray-100">
                  Details <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div>

</div>
    </div>
  );
}
