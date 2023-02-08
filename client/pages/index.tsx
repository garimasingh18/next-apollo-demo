import Link from 'next/link'
import Head from 'next/head'
import Name from '../components/name'
import Nav from '../components/nav'
import client from "../lib/apollo-client";
import { getNameQuery } from '../queries/name.query'
import 'bootstrap/dist/css/bootstrap.css'

export default function Home({ name }: { name: string }) {
  return (
    <div className="container mt-5">
      <Head><title>Home</title></Head>
      <Nav></Nav>
      <main>
        <h1 className="mb-3">
          Welcome, <Name name={name} />
        </h1>
      </main>

    </div>
  )
}
export async function getServerSideProps() {
  const { data } = await client.query({
    query: getNameQuery,
  })

  return {
    props: {
      name: data.name,
    },
  }
}


