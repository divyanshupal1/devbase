// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/databse"
import User from "@/models/User"
import { getToken } from "next-auth/jwt"
import {google} from "googleapis"
import Error from "next/error"
import { request } from "http"





export async function POST(req:NextRequest,res:NextResponse) {
    // const session = await getServerSession(authOptions)
  const data = await req.json();
  const title = data.title;
  const columns = data.columns;
  let id:string|null|undefined=""

  const token = await getToken({req}).then((token) => {return token?.access_token})
  if (!token) {
    return NextResponse.redirect(new URL("http://localhost:3000/"))
  }

  await connectToDB();
  const user = await User.findOne({ access_token:token });

  if(!user){
    return NextResponse.redirect(new URL("http://localhost:3000/"))
  }
  const { access_token,refresh_token} = user;
  let auth = new google.auth.OAuth2(
     process.env.GOOGLE_CLIENT_ID,
     process.env.GOOGLE_CLIENT_SECRET,
     process.env.NEXTAUTH_URL,
  )
  auth.setCredentials({refresh_token:refresh_token,access_token:access_token}) 
  
  const sheets = google.sheets({version: 'v4', auth});
  const resource = {
    properties: {
      title:title?String(title):"New Sheet",
    },
  };
  try {
    const spreadsheet =await sheets.spreadsheets.create({
      fields: 'spreadsheetId',
      requestBody: resource,
    });
    id=spreadsheet.data.spreadsheetId;
    console.log(`Spreadsheet ID:`,spreadsheet.data.spreadsheetId ,spreadsheet.data.spreadsheetUrl);
    try{
      const result = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: id!,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data: [{
            range: '1:1',
            values: [columns]
          }]          
        }
      })
      const result2 = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: id!,
        requestBody: {
          requests: [
            {
              "addConditionalFormatRule": {
                "rule": {
                  ranges: [{
                    sheetId: 0,
                    startRowIndex: 0,
                    endRowIndex: 1
                  }],
                  booleanRule: {
                    condition: {
                      type: "CUSTOM_FORMULA",
                      values: [{
                        userEnteredValue: "=ISTEXT(A1)"
                      }]
                    },
                    format: {
                      textFormat: {
                        bold: true,
                      }
                    }
                  }
                }
              }
            },
          ],
        },
        }
      )
      console.log('%d cells updated.', result.data?.totalUpdatedCells);
    }
    catch(err){
      // TODO (developer) - Handle exception
      throw err;
    }
    
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }


  return new Response(JSON.stringify({id}), {status: 200})
}

