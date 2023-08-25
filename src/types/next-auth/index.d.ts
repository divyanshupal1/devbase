import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    } & DefaultSession["user"]
  }
  
  export interface Profile {
    sub?: string
    name?: string
    email?: string
    image?: string
    [claim: string]: unknown
  }
  
  export interface Account {
    refresh_token?: string
    access_token?: string
    providerAccountId: string
    /** id of the user this account belongs to. */
    userId?: string
    /** id of the provider used for this account */
    provider: string
    /** Provider's type for this account */
    type: ProviderType
    [claim: string]: unknown
  }
  
  export interface UserType {
    id: string
    email: string
    emailVerified: Date | null    
    [claim: string]: unknown
  }
}