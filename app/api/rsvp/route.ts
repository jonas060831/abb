import connectDB from "@/app/config/database"
import Rsvp from "@/app/models/Rsvp"
import { generateUniqueRsvpId } from "@/app/utils/generateRsvpId"
import { NextRequest, NextResponse } from "next/server"

const GET = async (_: NextRequest) => {
    
    try {

        await connectDB()
        
        //get all rsvps
        const rsvps = await Rsvp.find()

        return NextResponse.json({ success: true, data: rsvps }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: 'Failed to get RSVPs' }, { status: 500 });
    }
}

const POST = async (req: Request) => {
    
    try {
        await connectDB()

        const body = await req.json()

        // Clean up empty guest names
        const cleanedGuestNames = body.guestNames.filter((name: string) => name.trim() !== '');

         // Generate unique rsvpId
        let rsvpId =  await generateUniqueRsvpId();


        const newRsvp = new Rsvp({
            ...body,
            guestNames: cleanedGuestNames,
            rsvpId,
        });

        await newRsvp.save();

        return NextResponse.json({ success: true, data: newRsvp }, { status: 201 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export {
    GET,
    POST
}

/*

{
    "guestNames": [
        "Peter Parker",
        "Angeli Javier",
        "Allen Iverson"
    ],
    "contactEmail": "jonas_sulit2001@yahoo.com",
    "contactNumber": "5106194656",
    "attendance": "Baptism & Reception"
}


*/