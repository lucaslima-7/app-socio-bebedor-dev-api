export interface CreateProvider {
  tradingName: string;
  companyName: string;
  companyFederalId: string;
  ddi: string;
  ddd: string;
  companyPhone: string;
  active: boolean;
}

export interface UpdateProvider {
  tradingName?: string;
  companyName?: string;
  companyFederalId?: string;
  ddi?: string;
  ddd?: string;
  companyPhone?: string;
  active?: boolean;
}
