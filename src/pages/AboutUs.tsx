const AboutUs = () => {
  return (
    <>
      <section className="container mx-auto">
        <div className="bg-white">
          <header className=" text-slate-900 py-12">
            <h1 className="text-5xl font-bold mt-16 uppercase border-b-2 border-orange-500 inline-block pb-1">
              About Us
            </h1>
          </header>

          <section className="text-center py-12 px-4">
            <h2 className="text-2xl font-bold">Our Mission and Values</h2>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Our mission is to provide exceptional sporting goods with a focus
              on quality, affordability, and customer satisfaction.
            </p>
            <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
              <div className="transition transform hover:scale-110">
                <h3 className="text-xl font-bold">1000+</h3>
                <p className="text-gray-700">Products Available</p>
              </div>
              <div className="transition transform hover:scale-110">
                <h3 className="text-xl font-bold">20+</h3>
                <p className="text-gray-700">Years of Experience</p>
              </div>
            </div>
          </section>

          <section className="bg-[#111111] text-white py-12 px-4">
            <h2 className="text-2xl font-bold text-center">Our Vision</h2>
            <p className="mt-4 text-center max-w-2xl mx-auto">
              To empower everyone to embrace an active lifestyle with the best
              sporting equipment and apparel available.
            </p>
          </section>

          <section className="text-center py-12 px-4">
            <h2 className="text-2xl font-bold">Our Product Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Fitness Equipment</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Team Sports</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Outdoor Gear</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Apparel</h3>
              </div>
            </div>
          </section>

          <section className="bg-gray-100 py-12 px-4">
            <h2 className="text-2xl font-bold text-center">
              Our Product Quality and Service Commitment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
              <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold">
                  Exceptional Quality Control
                </h3>
                <p className="text-gray-700 mt-2">
                  Our products undergo rigorous testing to ensure they meet the
                  highest quality standards.
                </p>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold">
                  Personalized Customer Service
                </h3>
                <p className="text-gray-700 mt-2">
                  Our dedicated team is committed to providing personalized
                  assistance to help you make the best choice.
                </p>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold">Timely Delivery</h3>
                <p className="text-gray-700 mt-2">
                  We ensure that your orders are processed and delivered
                  promptly for your convenience.
                </p>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold">
                  Customer Satisfaction Guarantee
                </h3>
                <p className="text-gray-700 mt-2">
                  We stand by our products and services, offering a satisfaction
                  guarantee for your peace of mind.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center py-12 px-4">
            <h2 className="text-2xl font-bold">
              Committed to Your Active Lifestyle
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Shop Now</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Expert Guidance</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Total Performance</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <h3 className="text-xl font-bold">Get Your Gear</h3>
              </div>
            </div>
          </section>

          <section className="bg-[#111111] text-white text-center py-12 px-4">
            <h2 className="text-2xl font-bold">Customer Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
              <div className="p-4 shadow-lg rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors">
                <p>
                  "The best place to find quality sports gear! Fast shipping and
                  excellent customer service."
                </p>
                <h3 className="mt-4 font-bold">- Customer A</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors">
                <p>
                  "I found everything I needed for my training in one place.
                  Highly recommend!"
                </p>
                <h3 className="mt-4 font-bold">- Customer B</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors">
                <p>
                  "Exceptional quality and fantastic prices. I'll be back for
                  more!"
                </p>
                <h3 className="mt-4 font-bold">- Customer C</h3>
              </div>
            </div>
          </section>

          <section className="text-center py-12 px-4 w-full">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-8">
              <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
                <h3 className="text-xl font-bold">
                  How do I place an order online?
                </h3>
                <p className="mt-2 text-gray-700">
                  You can easily place an order through our website, add to cart
                  and then proceed to checkout.
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
                <h3 className="text-xl font-bold">What brands do you carry?</h3>
                <p className="mt-2 text-gray-700">
                  We carry a wide range of popular brands in sports equipment
                  and apparel.
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
                <h3 className="text-xl font-bold">Do you offer returns?</h3>
                <p className="mt-2 text-gray-700">
                  No, we plan to offer a hassle-free return policy within 30
                  days of purchase. But this system not started. Hope it will be
                  coming soon.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
