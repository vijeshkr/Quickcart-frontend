import React, { useContext } from 'react'
import UserContext from '../context'

const Home = () => {
  const { userDetails } = useContext(UserContext);

  console.log(userDetails)
  return (
    <div>Home
      {userDetails && userDetails.name}
    </div>
  )
}

export default Home