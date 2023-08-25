import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@/utils/databse"
import User  from "@/models/User"



export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          // scope: "openid email profile"
          scope: "openid email profile https://www.googleapis.com/auth/spreadsheets"
        }
      }
    })
  ],
}




export async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  // console.log(req)
  return await NextAuth(req, res, {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            access_type: "offline",
            response_type: "code",
            scope: "openid email profile"
          }
        }
      })
    ],
  
    callbacks: {
  
      async session({ session, user, token }) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        return session;
      },  
      async signIn({ user, account, profile, email, credentials }: any) {
        const isAllowedToSignIn = true
  
        if (isAllowedToSignIn) {
  
          await connectToDB();
          const userExists = await User.findOne({ email: profile.email });
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name,
              image: profile.picture,
              refresh_token: account.refresh_token,
              access_token: account.access_token
            });
          }
  
          else{
            try{          
               await User.updateOne({ email: profile.email }, 
                {$set: {
                  email: profile.email,
                  username: profile.name,
                  image: profile.picture,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token
                }}
                );       
            }
            catch(error:any){
               console.log("Error updating user: ", error.message);
            }
           }
  
          return true
  
        } else {
          return false
        }
      },
      async jwt({ token}) {
        // console.log("jwt",trigger)
        // console.log("token",token)
        await connectToDB();
        const userExists = await User.findOne({ email: token.email });
        token.access_token = userExists.access_token;
        return token
      }

    },
  })
}

export { auth as GET, auth as POST }