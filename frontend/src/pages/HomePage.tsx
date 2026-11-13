import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LatestProductsTabs } from '../components/home/LatestProductsTabs';
import { BridalJewellerySection } from '../components/home/BridalJewellerySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { ShopByBudget } from '../components/home/ShopByBudget';
import { ShopByOccasion } from '../components/home/ShopByOccasion';
import { InfoCareSection } from '../components/home/InfoCareSection';
import { CustomerGallerySection } from '../components/home/CustomerGallerySection';
import { CustomerTestimonials } from '../components/home/CustomerTestimonials';
import { FaqSection } from '../components/home/FaqSection';
import { InstagramSection } from '../components/home/InstagramSection';
import { BrandStorySection } from '../components/home/BrandStorySection';

export const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in bg-[#FFFDF8]">
      {/* 1. Full-Width Editorial Hero Section with Rent & Buy spotlights */}
      <HeroSection />

      {/* 2. Discover Our Latest Creations */}
      <LatestProductsTabs />

      {/* 3. The Royal Bridal Suite (Spotlight on bridal jewellery & rentals) */}
      <BridalJewellerySection />

      {/* 4. Featured Collections & Bestsellers */}
      <FeaturedProducts />

      {/* 5. Promotional & Gifting Banner */}
      <PromotionalBanner />

      {/* 6. Shop By Category */}
      <ShopByCategory />

      {/* 7. Shop By Budget */}
      <ShopByBudget />

      {/* 8. Shop By Occasion */}
      <ShopByOccasion />

      {/* 9. Care & Hygiene Standards (Sanitization, Delivery, Deposit Guarantee) */}
      <InfoCareSection />

      {/* 10. Real Kuveras Brides & Patrons Photo Gallery */}
      <CustomerGallerySection />

      {/* 11. Customer Testimonials & Reviews */}
      <CustomerTestimonials />

      {/* 12. Frequently Asked Questions */}
      <FaqSection />

      {/* 13. Instagram Community */}
      <InstagramSection />

      {/* 14. Brand Heritage & Story */}
      <BrandStorySection />
    </div>
  );
};
