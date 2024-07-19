import React, { useContext } from 'react'
import CategoryList from '../components/CategoryList';
import Banner from '../components/Banner';
import HorizontalProductCard from '../components/HorizontalProductCard';
import VerticalProductCard from '../components/VerticalProductCard';

const Home = () => {

  return (
    <div>
      <CategoryList/>
      <Banner/>

      <HorizontalProductCard category={'airpodes'} heading={'Airpodes'}/>
      
      <VerticalProductCard category={'mobiles'} heading={'Mobiles'}/>

      <HorizontalProductCard category={'watches'} heading={'Watches'}/>

      <VerticalProductCard category={'Mouse'} heading={'Mouse'}/>

      <VerticalProductCard category={"camera"} heading={"Camera & Photography"}/>
      <VerticalProductCard category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalProductCard category={"televisions"} heading={"Televisions"}/>
      <VerticalProductCard category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalProductCard category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home