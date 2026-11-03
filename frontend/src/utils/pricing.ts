import type { Coupon } from '../types';

/**
 * Standard Jewellery Rental Percentage: 30% of the bold discounted/selling price
 */
export const RENTAL_PERCENTAGE = 0.30;

/**
 * Calculate jewellery rental price: exactly 30% of the bold discounted/selling price.
 * Formula: Rental Price = Bold Selling Price × 0.30
 * Example:
 *   Original MRP (strikethrough): ₹11,710
 *   Bold Selling Price: ₹8,197
 *   Rental Price: ₹8,197 × 0.30 = ₹2,459.10 -> ₹2,459 (rounded to nearest rupee)
 */
export const calculateRentalPrice = (sellingPrice: number): number => {
  if (!sellingPrice || isNaN(sellingPrice)) return 0;
  return Math.round(sellingPrice * RENTAL_PERCENTAGE);
};

/**
 * Format a number as Indian Rupee currency (e.g. ₹12,499)
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate coupon discount savings amount
 */
export const calculateDiscount = (subtotal: number, coupon: Coupon | null): number => {
  if (!coupon) return 0;
  if (coupon.minAmount && subtotal < coupon.minAmount) return 0;

  if (coupon.discountType === 'percent') {
    return Math.round((subtotal * coupon.value) / 100);
  } else {
    return Math.min(coupon.value, subtotal);
  }
};

/**
 * Generate encoded WhatsApp link for product rental or purchase inquiry
 */
export const generateWhatsAppLink = (
  productName: string,
  sellingPrice: number,
  rentalPrice: number,
  type: 'rental' | 'general' = 'rental',
  whatsappNumber: string = '919910204680',
  rentalPeriod: string = '1 Day'
): string => {
  const calculatedRental = rentalPrice || calculateRentalPrice(sellingPrice);
  const text = type === 'rental'
    ? `Hi Kuveras! I am interested in renting the *${productName}* (Rental Price: ${formatINR(calculatedRental)}) with doorstep delivery across Delhi. Please share rental availability, security deposit details, and booking procedure.`
    : `Hi Kuveras! I have an inquiry regarding *${productName}* (Price: ${formatINR(sellingPrice)}) with doorstep delivery across Delhi. Could you please assist me with more details?`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
};
