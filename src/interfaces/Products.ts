export interface CreateProduct {
  name: string;
  providerId: number;
  categoryId: number;
  availableQuantity: number;
  availableInStock: number;
  price: number;
  active: boolean;
}

export interface UpdateProduct {
  name?: string;
  providerId?: number;
  categoryId?: number;
  availableQuantity?: number;
  availableInStock?: number;
  price?: number;
  active?: boolean;
}
