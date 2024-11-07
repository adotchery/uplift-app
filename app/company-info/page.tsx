import CompanyInfo from "@/components/company/company-info-tables";

async function getCompanyData() {
  const response = await fetch("http://localhost:3000/api/company-info", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch company data");
  }
  return response.json();
}

export default async function CompanyInfoPage() {
  const companyData = await getCompanyData();

  return (
    <div className="container mx-auto py-8">
      <h1 className="flex text-2xl font-bold mb-6">Your uplifted data has been delivered!</h1>
      <CompanyInfo companyData={companyData} />
    </div>
  );
}