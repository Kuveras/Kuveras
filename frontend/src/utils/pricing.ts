import type { Coupon } from '../types';

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
  salePrice: number,
  rentalPrice: number,
  type: 'rental' | 'general' = 'rental',
  whatsappNumber: string = '919910204680',
  rentalPeriod: string = '3 days'
): string => {
  const text = type === 'rental'
    ? `Hi Kuveras! I am interested in renting the *${productName}* (Rental Fee: ${formatINR(rentalPrice)}/${rentalPeriod}, Retail: ${formatINR(salePrice)}) with doorstep delivery across Delhi. Please share rental availability, security deposit details, and booking procedure.`
    : `Hi Kuveras! I have an inquiry regarding *${productName}* (Price: ${formatINR(salePrice)}) with doorstep delivery across Delhi. Could you please assist me with more details?`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
};
