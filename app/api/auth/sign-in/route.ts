import connectDB from "@/app/config/database";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const POST = async (req: Request) => {

    try {
        await connectDB()

        const body = await req.json();

        const { username, password } = body

        const user = await User.findOne({ username: username })

        const isPasswordCorrect = bcrypt.compareSync(password, user.hashedPassword)

        if(!isPasswordCorrect) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })

        const payload = { username: username, _id: user._id }

        const token = jwt.sign({ payload }, process.env.JWT_SECRET!)

        return NextResponse.json({ success: true, token: token })

    } catch (error) {
           console.error(error);
           const errMsg = error instanceof Error ? error.message : "Unknown error";
           return NextResponse.json({ success: false, error: errMsg }, { status: 500 }); 
    }
}

export { POST }