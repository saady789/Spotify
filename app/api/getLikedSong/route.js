import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";
export async function POST (request) {
   try{
    const body = await request.json();
    const{id} = body;
        
        const createSong = await prisma.likeSong.findMany({
           where:{likedById:id}
        })
        if(!createSong) return NextResponse.json("Not Found");
        return NextResponse.json(createSong);
   
   } catch(error) {
    console.log(error);
    return NextResponse.json("InternalServerError")
   }  
}