export type CompanyType = {
    businessName: string;
    address: string;
    area: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    industry: string;
  };
  
  export type CompanyData = {
    company?: CompanyType;
    parent?: CompanyType;
  };