import connectDB from "@/app/config/database"
import Rsvp from "@/app/models/Rsvp";
import { NextResponse, NextRequest } from "next/server";



//return the rsvp being search
const GET = async (_req: NextRequest,{ params }: { params: Promise<{ rsvpId: string }> }) => {
  try {
    await connectDB();

    const { rsvpId } = await params

    if (!rsvpId) {
      return NextResponse.json(
        { success: false, error: 'Missing RSVP ID' },
        { status: 400 }
      );
    }

    const rsvp = await Rsvp.findById(rsvpId);

    if (!rsvp) {
      return NextResponse.json(
        { success: false, error: 'RSVP not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rsvp }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to get RSVP' },
      { status: 500 }
    );
  }
};

const PUT = async (req: NextRequest,{ params }: { params: Promise<{ rsvpId: string }> })  => {
  try {
    await connectDB();
    
    const { rsvpId } = await params;
    const body = await req.json();

    if (!rsvpId) {
      return NextResponse.json(
        { success: false, error: 'Missing RSVP ID' },
        { status: 400 }
      );
    }

    // Validate required fields
    const { guestNames, contactEmail, contactNumber, attendance } = body;
    
    if (!guestNames || !contactEmail || !contactNumber || !attendance) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedRsvp = await Rsvp.findByIdAndUpdate(
      rsvpId,
      { 
        guestNames,
        contactEmail,
        contactNumber,
        attendance,
        updatedAt: new Date()
      },
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validation
      }
    );

    if (!updatedRsvp) {
      return NextResponse.json(
        { success: false, error: 'RSVP not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedRsvp },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update RSVP' },
      { status: 500 }
    );
  }
}

export { GET, PUT }