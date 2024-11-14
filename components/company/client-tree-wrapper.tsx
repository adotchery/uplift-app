"use client";

import React from "react";
import CompanyTree from "./company-tree";
import { TreeNode } from "@/types/tree";

interface ClientTreeWrapperProps {
    companyData: TreeNode[];
  }
  
  const ClientTreeWrapper: React.FC<ClientTreeWrapperProps> = ({ companyData }) => {
    return <CompanyTree companyData={companyData} />;
  };
  
  export default ClientTreeWrapper;
