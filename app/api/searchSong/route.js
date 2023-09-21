import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const dataArray = body.data;

    const uniqueSongs = new Set(); // Use a Set to store unique songs

    for (const word of dataArray) {
      const foundSongs = await prisma.song.findMany({
        where: {
          title: {
            contains: word, // Search for the word in the title field
          },
        },
      });

      // Add the found songs to the uniqueSongs Set
      foundSongs.forEach((song) => uniqueSongs.add(song));
    }

    // Convert the Set back to an array
    const uniqueSongsArray = Array.from(uniqueSongs);

    return NextResponse.json(uniqueSongsArray);
  } catch (error) {
    console.error(error);
    return NextResponse.json("InternalServerError");
  }
}
