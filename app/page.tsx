import React from "react"
import Link from "next/link"
export default function Home() {
  return (
    <main>
     <h1>hello world</h1>
     <Link href="/about">Go to About</Link>
     <br/>
     <Link href="/users">Go to users</Link>
    </main>
  )
}
