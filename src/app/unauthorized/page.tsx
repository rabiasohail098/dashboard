

// const Unauthorized: FC = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
//       <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-xl">
//         <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
//         <p className="text-xl text-gray-600 mb-6">
//           Oops! You don't have permission to view this page.
//         </p>
//         <div className="text-lg text-gray-700 mb-8">
//           Please make sure you have the appropriate permissions to access the dashboard.
//         </div>
//         <a
//           href="https://q-commerce-food-tuck.vercel.app/"
//           className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 transition-colors duration-200"
//         >
//           Go to Home
//         </a>
//       </div>
//       <footer className="absolute bottom-4 text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} Food Tuck. All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// export default Unauthorized;
"use client";
import { FC } from 'react';
import React from "react";
import Link from "next/link";
const Error: FC = () => {
  return (
    <>
          <section
        className="bg-cover bg-center w-full h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">404 Error</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › 404
          </p>
        </div>
      </section>
<div className="flex  flex-col text-center items-center  mx-auto w-full md:w-[630px] justify-center  h-auto top-{530} left-{645} py-10 px-4 md:px-8 lg:px-12 gap-6 rounded-[6px]">
<h2 className="text-[64px] md:w-[630px] w-full md:text-[80px] lg:text-[96px] font-bold  text-[#FF9F0D]">403</h2>
<h4 className="w-full text-[32px] font-bold  text-[#333333]">Unauthorized Access</h4>
<p className="text-[18px] w-full font-bold font-inter text-[#4F4F4F] px-4">You do not have permission to access this page.</p>
<a
           href="https://q-commerce-food-tuck.vercel.app/"
           className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 transition-colors duration-200"
         >
           Go to Home
        </a>
          </div>
          <footer className="absolute bottom-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Food Tuck. All Rights Reserved.
       </footer>
    </>
  );
};

export default Error;
