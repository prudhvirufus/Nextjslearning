import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPost"
import { Suspense } from "react"
import UserPosts from "./components/UserPosts"
import { Metadata } from "next"
import getAllUsers from "@/lib/getAllUsers"


type Params = {
params:{
    userId:string
}
}
export async function generateMetadata(
{params:{userId}}:Params):
Promise<Metadata>{
    const userData : Promise<User> =getUser(userId)
    const user:User =  await userData
    return{
        title:user.name,
        description:`this is the page of ${user.name}`
    }

}



export default async function UserPage({params:{userId}}:Params) {
 const userData : Promise<User> =getUser(userId)
 const userPostData : Promise<Post[]> = getUserPosts(userId)
  
//  const [user, userPosts] = await Promise.all([userData,userPostData])
  const user =  await userData


 return (
    <>
    <h1>{user.name}</h1>
    <br/>
    <Suspense fallback={<h2>Loading....</h2>}>
    
    <UserPosts promise={userPostData}/>
    
    </Suspense>
    </>
  )
}

export async function  generateStaticParams(){
  const userData:Promise<User[]> = getAllUsers()
  const users =  await userData
  return users.map(user=>({userId:user.id.toString()}))

}