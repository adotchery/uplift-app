import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type CompanyData = {
  businessName: string;
  address: string;
  area: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  industry: string;
};

interface CompanyTableProps {
  company: CompanyData | undefined;
  type: "Company" | "Parent Company";
}

export function CompanyTable({ company, type }: CompanyTableProps) {
  if (!company) {
    return <div>No {`${type}`.toLowerCase()} information available.</div>;
  }

  return (
    <Table className="w-full border border-gray-200 rounded-lg shadow-sm text-sm">
      <TableCaption className="font-semibold text-lg mb-2">
        {/* {type} Information */}
      </TableCaption>
      <TableHeader>
        <TableRow className="h-6">
          <TableHead className="bg-gray-100 text-xs p-1"></TableHead>
          <TableHead className="bg-gray-100 text-xs p-1"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(company as Record<string, string | undefined>).map(([key, value]) => (
          <TableRow key={key} className="h-1"> 
            <TableCell className="font-medium capitalize p-2">
              {key.replace(/([A-Z])/g, " $1")}
            </TableCell>
            <TableCell className="p-1">{value || "N/A"}</TableCell> {/* Reduced padding */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}