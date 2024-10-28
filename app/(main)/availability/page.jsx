import { getUserAvailability } from '@/actions/availability'
import React from 'react'
import { defaultAvailability } from './data'
import AvailabilityForm from './_components/availabilityform'

const AvailabilityPage = async () => {
 const availability = await getUserAvailability()
console.log(availability)


  return (
     <AvailabilityForm initalData={availability || defaultAvailability}/>
  )
}

export default AvailabilityPage 


 
