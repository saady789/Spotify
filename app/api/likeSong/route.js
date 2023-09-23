import { NextResponse } from "next/server";
import prisma from "../../prismaClient/prismaClient";

export async function POST(request) {
  try {
    const body = await request.json();
    const currentSong = body.currentSong;
    const currentUser = body.currentUser;

    const userId = currentUser?.id;
    const songId = currentSong?.id;
   
    if(songId && userId){
     
    
      const likeSong = await prisma.likeSong.findMany({
        where: {
          likedById: currentUser.id,
          likedSongId: currentSong.id,
        },
      });
      
      if (likeSong.length) {
        return NextResponse.json("Like already exists");
      }
  
      // Create a new like
      const createdLikeSong = await prisma.likeSong.create({
        data: {
          likedBy: { connect: { id: userId } },
          likedSong: { connect: { id: songId } },
        },
        include: { likedBy: true, likedSong: true },
      });
  
      if (!createdLikeSong) return NextResponse.json("InternalServerError");
      return NextResponse.json(createdLikeSong);
    } 
    else {
      console.log("Id not found");
      return NextResponse.json("Id not found");
    }
   
  } catch (error) {
    console.error(error);
    return NextResponse.json("InternalServerError");
  }
}
