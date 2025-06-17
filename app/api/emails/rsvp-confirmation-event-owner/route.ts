import connectDB from "@/app/config/database";
import createTransporter from "@/app/utils/nodeMailer";
import { NextRequest, NextResponse } from "next/server";


const POST = async (req: NextRequest): Promise<NextResponse> => {

    try {

        await connectDB()

        const body = await req.json()
        const { rsvpEmailToOwnerTemplate } = body

        const transporter = await createTransporter();

        await transporter.sendMail({
        from: `System Generated <${process.env.GOOGLE_EMAIL}>`,
        to: process.env.GOOGLE_EMAIL,
        cc: process.env.EVENT_OWNER_2,
        subject: "Amara's Baptism and Birthday Celebration",
        html: rsvpEmailToOwnerTemplate,
        });

        return NextResponse.json({ success: true, data: "System message sent succesfully" },{ status: 200 }
    );
        
    } catch (error) {
        console.error(error);
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
        { success: false, error: errMsg },
        { status: 500 }
        );
    }
}

export { POST }