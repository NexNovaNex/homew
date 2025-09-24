import React from 'react';

const BuyBox = () => {
  return (
    <section id="pricing-section" className="w-full flex flex-col items-center bg-white py-8 md:py-16 px-2 md:px-4">
      <div className="max-w-3xl w-full mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-200 p-0 md:p-0">
        <div className="px-6 md:px-12 pt-8 pb-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">Get Your OdorGo Now</h2>
          <div className="text-lg text-blue-500 mb-2 font-semibold">Mid-Summer Special Offer</div>
          
          {/* Product Image */}
          <div className="flex justify-center -mx-6 md:-mx-12 mb-6">
            <img 
              src="/product-image.jpg" 
              alt="OdorGo device" 
              className="w-full max-w-[500px] h-auto object-contain" 
              width={500} 
              height={500} 
            />
          </div>

          {/* Single CTA Button */}
          <a
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full text-lg md:text-xl transition flex items-center justify-center gap-2 shadow-lg mt-2 mb-6 px-4 md:px-8"
            href="https://newsrelease.odorgo.store/new-checkout-1695176203-1702051815-1702053141-1706890883"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-center">GET YOUR ODORGO NOW</span>
          </a>

          {/* Money Back Guarantee */}
          <div className="text-sm text-gray-600 mt-4 flex items-center justify-center gap-2 mb-4">
            <span>🛡️</span>
            <span>90-Day Money Back Guarantee</span>
          </div>

          {/* Features/Benefits Box */}
          <div className="w-full max-w-lg mx-auto">
            <ul className="border-2 border-blue-200 bg-white rounded-xl px-6 py-4 grid grid-cols-1 gap-2 text-base font-medium shadow">
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-green-600 font-bold">✔ Mid-Year Discount</span>
                <span className="line-through text-blue-400">$20</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-blue-600">🎁 <span className="font-bold">FREE</span> Gift When Ordering 2 or More</span>
                <span className="line-through text-blue-400">$18</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-blue-600">🎧 <span className="font-bold">FREE</span> Home Smoke Remover Guide</span>
                <span className="line-through text-blue-400">$21</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-blue-600">🚚 <span className="font-bold">FREE</span> Priority Shipping</span>
                <span className="line-through text-blue-400">$9</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-green-600 font-bold">✔ VIP Access to New Tips & Tricks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyBox; 
