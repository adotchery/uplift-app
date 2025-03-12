import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { storePersonData } from "@/server/personDataStore"

// Schema validation using Zod
const requestSchema = z.object({
  content: z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      state: z.string().min(2),
      city: z.string().min(2),
      email: z.string().email(),
      streetAddress: z.string().min(5)
    })
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate incoming data
    const parsedData = requestSchema.safeParse(body)
    if (!parsedData.success) {
      console.error("Validation error:", parsedData.error.errors)
      return NextResponse.json({ error: "Invalid request data", details: parsedData.error.errors }, { status: 400 })
    }

    // Extract validated content
    const { content } = parsedData.data
    console.log("Received content:", content)

    const username = process.env.USERNAME
    const password = process.env.PASSWORD

    if (!username || !password) {
      console.error("Missing environment variables: USERNAME or PASSWORD")
      return NextResponse.json({ error: "Server misconfiguration: missing credentials" }, { status: 500 })
    }

    // Encode credentials in Base64
    const authString = Buffer.from(`${username}:${password}`).toString("base64")

    try {
      // Make the request to Boomi API
      const response = await fetch("https://c01-usa-east.integrate-test.boomi.com/ws/rest/dmaAI/chatGPTRequest/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify({ content }),
      })

      // Handle API response errors
      if (!response.ok) {
        console.error("Boomi API request failed:", response.status, response.statusText)
        return NextResponse.json({ error: "Failed to fetch data from Boomi API" }, { status: response.status })
      }

      // Parse API response
      const personData = await response.json()
      console.log("Boomi API response data:", personData)

      // Generate a submission ID
      const submissionId = Date.now().toString()

      // Store the data server-side
      storePersonData(submissionId, content, personData)

      // Send the response back to the client with the ID
      return NextResponse.json(
        {
          personData,
          submissionId,
        },
        { status: 200 },
      )
    } catch (error) {
      console.error("Error calling Boomi API:", error)

      // For development/testing, return mock data if API call fails
      const mockPersonData = {
        education: "Bachelor's Degree",
        licenses: "None",
        ageGroup: "Millennial",
        activities: "Reading, Hiking, Coding",
        additionalInfo: {
          creditScore: "Good",
          employmentStatus: "Employed",
        },
      }

      // Generate a submission ID
      const submissionId = Date.now().toString()

      // Store the mock data server-side
      storePersonData(submissionId, content, mockPersonData)

      return NextResponse.json(
        {
          personData: mockPersonData,
          submissionId,
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Server error occurred while processing your request" }, { status: 500 })
  }
}