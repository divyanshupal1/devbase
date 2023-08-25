// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { NextRequest, NextResponse } from "next/server"
import { NextURL } from "next/dist/server/web/next-url"
import { connectToDB } from "@/utils/databse"
import User from "@/models/User"
import { getToken } from "next-auth/jwt"
import {google} from "googleapis"
import Error from "next/error"





export async function GET(req:NextRequest) {
    // const session = await getServerSession(authOptions)

  const token = await getToken({req}).then((token) => {return token?.access_token})
  if (!token) {
    return NextResponse.redirect(new NextURL("http://localhost:3000/"))
  }

  await connectToDB();
  const user = await User.findOne({ access_token:token });

  if(!user){
    return NextResponse.redirect(new NextURL("http://localhost:3000/"))
  }
  const { access_token,refresh_token} = user;
  let auth = new google.auth.OAuth2(
     process.env.GOOGLE_CLIENT_ID,
     process.env.GOOGLE_CLIENT_SECRET,
     process.env.NEXTAUTH_URL,
  )
  auth.setCredentials({refresh_token:refresh_token,access_token:access_token}) 
  
  const sheets = google.sheets({version: 'v4', auth});
  // const resource = {
  //   properties: {
  //     title:"DEvbase",
  //   },
  // };
  // try {
  //   const spreadsheet =await sheets.spreadsheets.create({
  //     fields: 'spreadsheetId',
  //     requestBody: resource,
  //   });
  //   console.log(`Spreadsheet ID:`,spreadsheet.data.spreadsheetId ,spreadsheet.data.spreadsheetUrl);
    
  // } catch (err) {
  //   // TODO (developer) - Handle exception
  //   throw err;
  // }

  let values = [
    [
     "hello","world"
    ],
    // Additional rows ...
  ];
  const resource = {
    values,
  };
  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId:"1UOBgFtw1Y0iPbSXxaqM3T5OeNgcqAkkE8L8wIhpZfFM",
      range:"Sheet1!A:B",
      valueInputOption:"USER_ENTERED",
      requestBody:{
        values:values
      }
    });
    console.log('%d cells updated.', result.data.updates?.updatedCells);
  } catch (err) {
    // TODO (Developer) - Handle exception
    throw err;
  }

  return new Response(JSON.stringify({"atoken":refresh_token,"token":token}), {status: 200})
}

