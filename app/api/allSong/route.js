import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";
export async function POST (request) {
   try{
    
        const createSong = await prisma.song.findMany({
            
        })
        if(!createSong) return NextResponse.json("InternalServerError");
        return NextResponse.json(createSong);
   
   } catch(error) {
    console.log(error);
    return NextResponse.json("InternalServerError")
   }  
}

