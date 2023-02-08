import { ApolloProvider } from '@apollo/client'
import client from '../lib/apollo-client'
import { User } from '../types/type'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import ListUsers from '../components/list-users'
import { getUsersQuery } from '../queries/users.query'
import Head from 'next/head'
import Nav from '../components/nav'
import 'bootstrap/dist/css/bootstrap.css'

export default function Users({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className="container mt-5">
      <Nav></Nav>
      <Head>
        <title>Users</title>
      </Head>

      <ApolloProvider client={client}>
        <div>
          <h1 className="mb-3">Users Page</h1>
          <ListUsers users={users} />
        </div>
      </ApolloProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  users: User[]
}> = async () => {
  const { data } = await client.query({
    query: getUsersQuery,
    variables: {
      limit: 20,
      offset: 0,
    },
  })

  return {
    props: {
      users: data.users,
    },
  }
}

