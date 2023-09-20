import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";
export async function POST (request) {

   try{
    const body = await request.json();
    const{title,thumbnail,song} = body;
    let id = body.currentUser.id;
        const createSong = await prisma.song.create({
            data:{
                title,
                thumbnail,
                song,
                uploadedBy:{connect:{id}}
            },
            include: { uploadedBy: true },
        })
        if(!createSong) return NextResponse.json("InternalServerError");
        return NextResponse.json(createSong);
   
   } catch(error) {
    console.log(error);
    return NextResponse.json("InternalServerError")
   }
    
   
}