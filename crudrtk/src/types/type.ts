export type employee = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  company_id: number;
  designation_id: number;
  company_name: string;
  designation_name: string;
};

export interface companyData {
  id: number,
  company_name: string,
  created_at: Date,
  updated_at: Date
}

export interface designationData {
  id: number,
  designation: string,
  created_at: Date,
  updated_at: Date,
  company_id: number
}
