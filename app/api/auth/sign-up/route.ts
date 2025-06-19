import connectDB from "@/app/config/database";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRound = parseInt(process.env.SALT_ROUND!)



// Sign up new User
const POST = async (req: Request) => {
  try {
    await connectDB()

    const body = await req.json();

    const { username, password, role } = body

    const userInDatabase = await User.findOne({ username: username })


    if(userInDatabase) return NextResponse.json({ success: false, error: 'Username already taken.' }, { status: 409 })

    const user = await User.create({
        username: username,
        hashedPassword: bcrypt.hashSync(password, saltRound),
        role: role
    })

    const payload = { username: user.username, _id: user._id }

    const token = jwt.sign({ payload }, process.env.JWT_SECRET!)


    return NextResponse.json({ success: true, user: user, token: token }, { status: 201 });

  } catch (error: unknown) {
    console.error(error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
};

export { POST };