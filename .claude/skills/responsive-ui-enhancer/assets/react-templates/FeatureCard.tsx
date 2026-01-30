interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
        <div className={`w-6 h-6 ${iconColor}`}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you build amazing websites faster
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            title="Lightning Fast"
            description="Optimized for performance with minimal load times"
          />

          <FeatureCard
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
            title="Fully Responsive"
            description="Works perfectly on all devices and screen sizes"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />

          <FeatureCard
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            }
            title="Customizable"
            description="Easy to customize colors, fonts, and components"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </div>
    </section>
  );
}
