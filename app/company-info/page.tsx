import ClientTreeWrapper from "@/components/company/client-tree-wrapper";
import CompanyInfo from "@/components/company/company-info-tables";
import Image from "next/image";
import { TreeNode } from "@/types/tree";


async function getCompanyData(): Promise<TreeNode[]> {
  const response = await fetch("http://localhost:3000/api/company-info", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch company data");
  }
  return response.json();
}

export default async function CompanyInfoPage({searchParams}: {
  searchParams: { [key: string]: string };}) 
  {
  const message = await searchParams?.message || "";
  const companyData = await getCompanyData();

  return (
    <div className="container mx-auto py-8">
      {message && (
        <h1 className="text-lg font-semibold text-center mb-4">
          Submitted Message: {message}
        </h1>
      )}
      <h1 className="flex justify-center text-2xl font-bold mb-6">
        Your uplifted data has been delivered!
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1 mb-8 md:mb-0">
          <CompanyInfo companyData={companyData} />
        </div>
        <div className="flex-1">
          <ClientTreeWrapper companyData={companyData} />
        </div>
      </div>

      <footer className="flex items-center justify-center mt-8 w-full text-center">
        <a
          href="https://www.huronconsultinggroup.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Image
            aria-hidden
            src="/Huron_Vertical-Black.svg"
            alt="Huron Logo"
            width={32}
            height={32}
          />
          <h1>Powered by Global Data Management & Analytics</h1>
        </a>
      </footer>
    </div>
  );
}