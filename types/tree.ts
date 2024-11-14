export interface CompanyAttributes {
    businessName: string;
    address: string;
    area: string;
    city: string;
    postal_code: string;
    state_region: string;
    country: string;
    industry: string;
  }
  
  export interface TreeNode {
    name: string;
    attributes: CompanyAttributes;
    children?: TreeNode[];
  }