import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";


export async function POST (request) {

   try{
    const body = await request.json();
  
    const{name,email,image} = body;
    const checkUser = await prisma.user.findUnique({
        where:{email}
    })
    if(!checkUser){
        const createUser = await prisma.user.create({
            data:{
             
                email:email,
                name:name,
                image:image
    
            },
        })
        if(!createUser) return NextResponse.json("InternalServerError");
        return NextResponse.json(createUser);
    }
    else {
        return NextResponse.json(checkUser);

    }
   } catch(error) {
    console.log(error);
    return NextResponse.json("InternalServerError")
   }
    
   
}