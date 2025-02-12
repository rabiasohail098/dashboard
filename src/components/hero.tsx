import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Hero = () => {
  return (
    <div>
        <section
        className="bg-cover  h-fit flex items-center bg-black justify-between px-4">
        <div className='bg-black w-full px-6 sm:px-10 md:px-32 gap-6 py-8 md:py-12 lg:py-16 flex flex-col-reverse md:flex-row items-center'>
        <div className="text-white md:w-[572px] flex flex-col items-center md:items-start text-center md:text-left px-4 sm:px-8">
          <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-greatvibes font-normal text-[#FF9F0D]">
          Healthy and testy food
          </h1>
          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold font-helvetica mt-3">
            <span className="text-[#FF9F0D]">Enjoy</span> Healthy Life & Testy Food.
          </h2>
          <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-inter mt-4 max-w-[418px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mt-6">
            <Link href="/menu">
              <button className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 text-white w-[130px] sm:w-[160px] md:w-[190px] h-[40px] sm:h-[50px] md:h-[60px] rounded-[40px]">
                Go to Dashboard
              </button>
            </Link>
            </div>
            </div>
        <div  className="bg-cover w-1/2 h-[400px]"
          style={{ backgroundImage: "url('/images/1.png')" }}>
          <div className='h-[380px] w-[380px] absolute'>
         <Image src="/images/Bg.png" alt ="img" width={300} height={300} className='w-[300px] h-[330px] -pt-5 ml-12 '/>
          </div>
          <Image src="/images/h1.png" alt="img" width={250} height={250} className='relative animate-spin mt-[26px] ml-[92px] w-[270px] h-[270px]'/>
            {/* Spinning Overlay Image */}
 

</div>
</div>
      </section>
    </div>
  )
}

export default Hero