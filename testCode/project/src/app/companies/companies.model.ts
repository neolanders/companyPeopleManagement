export interface Company {
  id: string;
  name: string;
  address: string;
  revenue: string;
  phone: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  companyId: string;
}
