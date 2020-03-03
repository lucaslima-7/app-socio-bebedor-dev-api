export interface User {
  federalId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  ddi: string;
  ddd: string;
  mobilePhone: string;
  profilePic: string;
  birthDate: Date;
  active: boolean;
  gender: string;
  role: string;
}
