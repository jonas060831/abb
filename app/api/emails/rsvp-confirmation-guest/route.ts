import connectDB from "@/app/config/database";
import createTransporter from "@/app/utils/nodeMailer";
import { NextRequest, NextResponse } from "next/server";

// API route to send RSVP confirmation email to guest
const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectDB();

    const body = await req.json();
    const { guestEmail, rsvpEmailToGuestTemplate } = body;

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: `Sulit Family <${process.env.GOOGLE_EMAIL}>`,
      to: guestEmail,
      subject: "Amara's Baptism and Birthday Celebration",
      html: rsvpEmailToGuestTemplate,
    });

    return NextResponse.json(
      { success: true, data: "All set. Get ready for good vibes." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
};

export { POST };
