 export interface CouponData {
    _id: string;
    code: string;
    discountType: string;
    discountAmount: number;
    discountPercentage: number;
    maxDiscount: number;
    minCart: number;
    expiryDate: string;
    description: string;
    couponCount: number;
    createdAt: Date;
    isApplied: boolean;
  }
 export interface CouponListingTableProps {}


  