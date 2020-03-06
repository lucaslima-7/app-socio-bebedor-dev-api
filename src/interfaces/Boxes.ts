export interface CreateBox {
  competitionId: number;
  firstProductId: number;
  firstProductQuantity: number;
  secondProductId?: number;
  secondProductQuantity?: number;
  thirdProductId?: number;
  thirdProductQuantity?: number;
  fourthProductId?: number;
  fourthProductQuantity?: number;
  fifthProductId?: number;
  fifthProductQuantity?: number;
  finalPrice: number;
  active: boolean;
}

export interface UpdateBox {
  competitionId?: number;
  firstProductId?: number;
  firstProductQuantity?: number;
  secondProductId?: number;
  secondProductQuantity?: number;
  thirdProductId?: number;
  thirdProductQuantity?: number;
  fourthProductId?: number;
  fourthProductQuantity?: number;
  fifthProductId?: number;
  fifthProductQuantity?: number;
  finalPrice?: number;
  active?: boolean;
}
