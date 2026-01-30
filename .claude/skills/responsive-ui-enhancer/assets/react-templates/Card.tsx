import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md ${
        hover ? 'hover:shadow-xl transition-shadow' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  quote: string;
}

export function TestimonialCard({ name, role, avatarUrl, quote }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">{quote}</p>
    </Card>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  features,
  featured = false,
  ctaText = 'Get Started',
  onCtaClick,
}: PricingCardProps) {
  return (
    <Card
      className={`p-8 ${featured ? 'ring-2 ring-blue-600 transform scale-105' : ''}`}
      hover={false}
    >
      {featured && (
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onCtaClick}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          featured
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {ctaText}
      </button>
    </Card>
  );
}

export default Card;
