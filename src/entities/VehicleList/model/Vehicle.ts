interface VehicleDimensions {
  width: number;
  height: number;
  depth: number;
}

interface VehicleMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface VehicleReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Vehicle {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: VehicleDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: VehicleReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: VehicleMeta;
  images: string[];
  thumbnail: string;
}
