"use client";

import React from "react";
import CompanyTree from "./company-tree";
import { TreeNode } from "@/types/tree";

interface ClientTreeWrapperProps {
    companyData: {
      company: {
        businessName: string;
        address: string;
        area: string;
        city: string;
        postalCode: string;
        state: string;
        country: string;
        industry: string;
      };
      parent: {
        businessName: string;
        address: string;
        area: string;
        city: string;
        postalCode: string;
        state: string;
        country: string;
        industry: string;
      };
    };
  }

  function mapCompanyDataToTree(data: ClientTreeWrapperProps["companyData"]): TreeNode[] {
    return [
      {
        name: data.parent.businessName,
        attributes: {
          Address: data.parent.address,
          City: data.parent.city,
          State: data.parent.state,
          Country: data.parent.country,
          Industry: data.parent.industry,
        },
        children: [
          {
            name: data.company.businessName,
            attributes: {
              Address: data.company.address,
              City: data.company.city,
              State: data.company.state,
              Country: data.company.country,
              Industry: data.company.industry,
            },
          },
        ],
      },
    ];
  }
  
  const ClientTreeWrapper: React.FC<ClientTreeWrapperProps> = ({ companyData }) => {
    const companyTreeData = mapCompanyDataToTree(companyData);
    
    return (
        <div>
          <CompanyTree companyData={companyTreeData} />
        </div>
         );
        };
  
  export default ClientTreeWrapper;
