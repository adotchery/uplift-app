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
    <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
      <TableCaption className="font-semibold text-lg">
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-gray-100"></TableHead>
          <TableHead className="bg-gray-100"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(company as Record<string, string | undefined>).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </TableCell>
            <TableCell>{value || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
