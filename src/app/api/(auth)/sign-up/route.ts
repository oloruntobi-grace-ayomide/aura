import { prisma } from "@/lib/db"
import bcrypt from 'bcrypt'

export type SignUpData = {
    name:string
    email:string,
    password:string
}

export async function POST(request: Request) {
  try {
    const { name, email, password }:SignUpData = await request.json()
    
    if (!name || !email || !password) {
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    
    return Response.json({ 
      user: { id: user.id, email: user.email, name: user.name }, 
      message: "Successfully signed up." 
    }, { status: 201 })
    
  } catch (error) {
    return Response.json({ 
      error: error instanceof Error ? error.message : "Something went wrong. Please try again" 
    }, { status: 500 })
  }
}