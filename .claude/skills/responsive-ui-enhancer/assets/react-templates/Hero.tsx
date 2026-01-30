export default function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Build Beautiful Websites
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Create stunning, responsive websites with our modern component library.
              Fast, accessible, and easy to customize.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg">
                Get Started Free
              </button>
              <button className="bg-gray-200 text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
