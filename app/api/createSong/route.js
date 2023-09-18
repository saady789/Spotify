import { create } from "domain";
import prisma from "../../prismaClient/prismaClient";
import { NextResponse } from "next/server";


export async function POST (request) {

    const body = await request.json();
    const{id,name,email,image} = body;
    const createUser = await prisma.user.create({
        data:{
            id:id,
            email:email,
            name:name,
            image:image

        },
    })
    if(!createUser) return NextResponse({"status":"error"});
    return NextResponse({"status":"success"});
   
}