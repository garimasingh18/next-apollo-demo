import { useEffect, useState } from 'react'
import { User } from '../types/type'
import { useLazyQuery } from '@apollo/client'
import { getUsersQuery } from '../queries/users.query'
import Link from 'next/link'
import Button from 'react-bootstrap/Button';

type Props = {
  users: User[]
}
const ListUsers = ({ users }: Props) => {
  const [usersData, setUsersData] = useState(users)
  const [offset, setOffset] = useState(20)

  useEffect(() => {
    setUsersData(users)
  }, [users])

  const setUsers = (users: User[]) => {
    if (!users) {
      return
    }

    const newUsers = usersData.concat(users)
    setUsersData(newUsers)
    setOffset(offset + 20)
  }

  const [fetchUsers, { loading, error }] = useLazyQuery(getUsersQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setUsers(data?.users ?? [])
    },
  })

  const loadMoreData = () => {
    let queryVariables = {
      limit: 20,
      offset,
    }
    fetchUsers({
      variables: queryVariables,
    })
  }

  return (
    <div>
      <div className="row">
        {usersData.map((user, index) => {
          return (
            <div className="col-sm-12 col-md-6 mb-3">
              <div
                className="card user-card "
                key={index}
              >
                <div className="card-body row">
                  <div className="col-sm-1">
                    <p>{index + 1}.</p>
                  </div>
                  <div className="col-sm-11">
                    <p className="card-title">{user.name}</p>
                    <Link target="_blank" href={'mailto:' + user.email}>
                      <p className="card-subtitle mb-2 text-muted">
                        {user.email}
                      </p>
                    </Link>
                    <Link href={'tel:' + user.phoneNumber}>{user.phoneNumber}</Link>
                    <div>
                      <div>{user.address?.street}</div>
                      <div>{user.address?.city}</div>
                      <div>{user.address?.zipCode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {error ? (
        <div>End of data</div>
      ) : (
        <div className="d-grid col-6 mx-auto mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Button
              className="btn btn-primary"
              data-cy="load-more"
              onClick={() => loadMoreData()}
            >
              Load more
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
export default ListUsers
