import { NextRequest, NextResponse } from 'next/server';
import { setSubmittedData } from '@/server/submittedData';
// remove once a database is present
let submittedData: any = null;

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    
    // log the  content
    console.log("Received content:", content);
    
    // creds
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    
    // validate creds
    if (!username || !password) {
      console.error("Missing USERNAME or PASSWORD environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: missing credentials" },
        { status: 500 }
      );
    }

    // encrypt base64
    const authString = Buffer.from(`${username}:${password}`).toString('base64');

    // log (remove)
    console.log("Auth string:", authString);


    const response = await fetch("https://c01-usa-east.integrate-test.boomi.com/ws/rest/dmaAI/chatGPTRequest/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`,
      },
      body: JSON.stringify({ content }),
    });

    // response vaild
    if (!response.ok) {
      console.error("Boomi API request failed:", response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch data from Boomi API' },
        { status: response.status }
      );
    }

    // store company data
    const companyData = await response.json();
    // save locally
    setSubmittedData(companyData)

    // Log (delete)
    console.log("Boomi API response data:", companyData);

    // return to client side
    return NextResponse.json({ companyData }, { status: 200 });

  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { error: 'Server error occurred while processing your request' },
      { status: 500 }
    );
  }
}
