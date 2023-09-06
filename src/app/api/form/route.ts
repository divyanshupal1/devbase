import { NextApiRequest, NextApiResponse } from "next";

const allowe_host = "localhost:3000"

export async function POST(req:Request,res:NextApiResponse){
    const body = await req.json()
    console.log(body)
    return new Response(JSON.stringify({id:""}), {status: 200})
}