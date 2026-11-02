import type { Coupon } from '../types';

/**
 * Standard Jewellery Rental Percentage: 30% of the actual jewellery price
 */
export const RENTAL_PERCENTAGE = 0.30;

/**
 * Calculate jewellery rental price: exactly 30% of the original/actual jewellery price.
 * Formula: Rental Price = Actual Jewellery Price × 0.30
 * Example: Actual Price ₹11,500 -> Rental Price ₹3,450
 */
export const calculateRentalPrice = (actualPrice: number): number => {
  if (!actualPrice || isNaN(actualPrice)) return 0;
  return Math.round(actualPrice * RENTAL_PERCENTAGE);
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
  actualPrice: number,
  rentalPrice: number,
  type: 'rental' | 'general' = 'rental',
  whatsappNumber: string = '919910204680',
  rentalPeriod: string = '1 Day'
): string => {
  const calculatedRental = rentalPrice || calculateRentalPrice(actualPrice);
  const text = type === 'rental'
    ? `Hi Kuveras! I am interested in renting the *${productName}* (Rental Price: ${formatINR(calculatedRental)}/${rentalPeriod} [30% of Actual: ${formatINR(actualPrice)}]) with doorstep delivery across Delhi. Please share rental availability, security deposit details, and booking procedure.`
    : `Hi Kuveras! I have an inquiry regarding *${productName}* (Price: ${formatINR(actualPrice)}) with doorstep delivery across Delhi. Could you please assist me with more details?`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
};
