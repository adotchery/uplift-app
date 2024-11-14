"use client"
import React, { useState, useEffect } from "react";
import { CompanyTable } from "./company-table";
import { CompanyData } from "@/types/company";

type CompanyInfoProps = {
  companyData: {
    company: CompanyData;
    parent: CompanyData;
  };
};


export default function CompanyInfo({ companyData }: CompanyInfoProps) {
  const [data, setData] = useState(companyData);

  useEffect(() => {
    setData(companyData); // Initialize state with the server-fetched data
  }, [companyData]);

  return (
    <div className="flex flex-col space-y-8">
      {/* Company Table */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Company Data</h2>
        <CompanyTable company={data.company}/>
      </div>

      {/* Parent Company Table */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Parent Company Data</h2>
        <CompanyTable company={data.parent} />
      </div>
    </div>
  );
}