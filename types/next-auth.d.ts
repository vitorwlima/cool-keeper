import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name: string,
      id: string
    }
    expires: string
  }
}