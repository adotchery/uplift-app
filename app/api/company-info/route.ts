import { NextResponse } from 'next/server';
import { getSubmittedData } from '@/server/submittedData';


export async function GET() {
    console.log("Attempting to fetch data from submit endpoint...");
    try {
        const submittedData = getSubmittedData();
        if (!submittedData) {
          return NextResponse.json(
            { error: "No data found" },
            { status: 404 }
          );
        }
    
        return NextResponse.json(submittedData);
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to retrieve company data" },
          { status: 500 }
        );
      }
    }