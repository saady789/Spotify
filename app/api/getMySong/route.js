import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";
export async function POST (request) {

   try{
    const body = await request.json();
    const uploaderId = body.id;
    
        const getSongs = await prisma.song.findMany({
            where:{uploaderId}
        })
        if(!getSongs) return NextResponse.json("InternalServerError");
        return NextResponse.json(getSongs);
   
   } catch(error) {
    console.log(error);
    return NextResponse.json("InternalServerError")
   }
    
   
}