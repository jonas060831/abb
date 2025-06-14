import connectDB from "@/app/config/database";
import Rsvp from "@/app/models/Rsvp";
import { generateUniqueRsvpId } from "@/app/utils/generateRsvpId";
import { NextResponse } from "next/server";

// GET all RSVPs
const GET = async () => {
  try {
    await connectDB();

    const rsvps = await Rsvp.find();

    return NextResponse.json({ success: true, data: rsvps }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to get RSVPs" },
      { status: 500 }
    );
  }
};

// POST new RSVP
const POST = async (req: Request) => {
  try {
    await connectDB();

    const body = await req.json();

    const cleanedGuestNames = body.guestNames.filter(
      (name: string) => name.trim() !== ""
    );

    const rsvpId = await generateUniqueRsvpId();

    const newRsvp = new Rsvp({
      ...body,
      guestNames: cleanedGuestNames,
      rsvpId,
    });

    await newRsvp.save();

    return NextResponse.json({ success: true, data: newRsvp }, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
};

export { GET, POST };
