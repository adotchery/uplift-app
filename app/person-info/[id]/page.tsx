import { getPersonData } from "@/server/personDataStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { notFound } from "next/navigation"

export default function PersonInfoPage({ params }: { params: { id: string } }) {
  const personInfo = getPersonData(params.id)

  if (!personInfo) {
    notFound()
  }

  const { formData, apiData } = personInfo

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Personal Profile</CardTitle>
          <CardDescription>Detailed information about {formData.legalName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Attribute</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Legal Name</TableCell>
                  <TableCell>{formData.legalName || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Street Address</TableCell>
                  <TableCell>{formData.streetAddress || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">City/State</TableCell>
                  <TableCell>{`${formData.city || "N/A"}, ${formData.state || "N/A"}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{formData.email || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email Username</TableCell>
                  <TableCell>{formData.emailUsername || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email Domain</TableCell>
                  <TableCell>{formData.emailDomain || "N/A"}</TableCell>
                </TableRow>
                {formData.occupation && (
                  <TableRow>
                    <TableCell className="font-medium">Occupation</TableCell>
                    <TableCell>{formData.occupation}</TableCell>
                  </TableRow>
                )}
                {formData.nationality && (
                  <TableRow>
                    <TableCell className="font-medium">Nationality</TableCell>
                    <TableCell>{formData.nationality}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {apiData && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Attribute</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiData.education && (
                    <TableRow>
                      <TableCell className="font-medium">Education Degrees</TableCell>
                      <TableCell>{apiData.education}</TableCell>
                    </TableRow>
                  )}
                  {apiData.licenses && (
                    <TableRow>
                      <TableCell className="font-medium">Professional Licenses</TableCell>
                      <TableCell>{apiData.licenses}</TableCell>
                    </TableRow>
                  )}
                  {apiData.ageGroup && (
                    <TableRow>
                      <TableCell className="font-medium">Age/Generation</TableCell>
                      <TableCell>{apiData.ageGroup}</TableCell>
                    </TableRow>
                  )}
                  {apiData.activities && (
                    <TableRow>
                      <TableCell className="font-medium">Social Activities & Hobbies</TableCell>
                      <TableCell>{apiData.activities}</TableCell>
                    </TableRow>
                  )}
                  {apiData.additionalInfo &&
                    Object.entries(apiData.additionalInfo).map(([key, value]: [string, any]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                        </TableCell>
                        <TableCell>{typeof value === "object" ? JSON.stringify(value) : String(value)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}

          <Button asChild className="mt-6">
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>

      <footer className="flex items-center justify-center mt-8 w-full text-center">
        <a
          href="https://www.huronconsultinggroup.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <Image aria-hidden src="/Huron_Vertical-Black.svg" alt="Huron Logo" width={32} height={32} />
          <h1>Powered by Global Data Management & Analytics</h1>
        </a>
      </footer>
    </div>
  )
}