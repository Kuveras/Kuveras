import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LatestProductsTabs } from '../components/home/LatestProductsTabs';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { ShopByBudget } from '../components/home/ShopByBudget';
import { ShopByOccasion } from '../components/home/ShopByOccasion';
import { InfoCareSection } from '../components/home/InfoCareSection';
import { CustomerTestimonials } from '../components/home/CustomerTestimonials';
import { InstagramSection } from '../components/home/InstagramSection';
import { FaqSection } from '../components/home/FaqSection';
import { BrandStorySection } from '../components/home/BrandStorySection';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in bg-[#FFFDF8]">
      {/* 1. Full-Width Editorial Hero Section (Positioned directly under navigation) */}
      <HeroSection />

      {/* 2. Discover Our Latest Creations */}
      <LatestProductsTabs />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Promotional Banner */}
      <PromotionalBanner />

      {/* 5. Shop By Category */}
      <ShopByCategory />

      {/* 6. Shop By Budget */}
      <ShopByBudget />

      {/* 7. Shop By Occasion */}
      <ShopByOccasion />

      {/* 8. Care / Information */}
      <InfoCareSection />

      {/* 9. Frequently Asked Questions */}
      <FaqSection />

      {/* 10. Customer Testimonials */}
      <CustomerTestimonials />

      {/* 11. Instagram Section */}
      <InstagramSection />

      {/* 12. Brand Story Section */}
      <BrandStorySection />
    </div>
  );
};



