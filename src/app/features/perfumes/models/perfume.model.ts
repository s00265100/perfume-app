export interface Perfume {
  _id: string;
  name: string;
  brand: string;
  scentType: string;
  price: number;
  description: string;
  gender: 'Men' | 'Women' | 'Unisex';
  rating: number;
  imageUrl?: string;
}

export interface CreatePerfumeDto {
  name: string;
  brand: string;
  scentType: string;
  price: number;
  description: string;
  gender: 'Men' | 'Women' | 'Unisex';
  rating: number;
  imageUrl?: string;
}

export interface UpdatePerfumeDto {
  name: string;
  brand: string;
  scentType: string;
  price: number;
  description: string;
  gender: 'Men' | 'Women' | 'Unisex';
  rating: number;
  imageUrl?: string;
}