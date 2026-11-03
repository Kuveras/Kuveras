export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Kundan' | 'Rajwadi' | 'Temple' | 'Cubic Zirconia' | 'Bridal' | 'Matha Patti' | 'Bracelets' | 'Choker' | 'Rani Haar';
  subcategory?: string;
  occasion: 'Daily Wear' | 'Festive' | 'Bridal' | 'Party Wear' | 'Office Wear' | 'Date Night' | 'Day Out';
  price: number; // Original/Actual jewellery price INR
  salePrice: number; // Discounted purchase price INR
  discount: number; // Percentage off for purchase (e.g., 20, 35, 50)
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  images: string[];
  tags: string[];
  specifications: Record<string, string>;
  rentalPrice: number; // Rental price: exactly 30% of bold discounted/selling price (salePrice * 0.30)
  originalRentalPrice?: number; // Bold selling price INR (for rental reference)
  rentalPeriod?: string;
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  popular?: boolean;
  budgetCategory?: 'under-3000' | 'under-4500' | 'under-7000' | 'under-10000';
  sku?: string;
  material?: string;
  stone?: string;
  color?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isRental?: boolean;
  rentalDays?: number;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  value: number;
  minAmount?: number;
  description: string;
}

export interface FilterState {
  category: string;
  subcategory: string;
  occasion: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
  searchQuery: string;
  budgetTag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  verified: boolean;
  location?: string;
}
