import React, { useContext } from 'react'
import UserContext from '../context'
import CategoryList from '../components/CategoryList';
import Banner from '../components/Banner';

const Home = () => {

  return (
    <div>
      <CategoryList/>
      <Banner/>
    </div>
  )
}

export default Home