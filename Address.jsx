import React, { useState } from 'react'
import { useGlobalContext } from '../Context/Context'

const Address = () => {
  const { ShippingAddress = [], loading } = useGlobalContext()
  const [ShowAddress, SetShowAddress] = useState(false);

  if (loading) {
    return <h1>...Loading</h1>
  }
  if (!ShippingAddress.length) {
    return <div>No shipping addresses found.</div>
  }

  const AddAddress = () =>{
    SetShowAddress(true)
  }
  console.log(ShippingAddress)
  return (
    <div>
      <button type='button' onClick={AddAddress}>ADD A NEW ADDRESS</button>
      {ShowAddress ? 
      <div className='add-addressbox'>
        
      </div> : ""
      }
      <div className='address-row'>
        {ShippingAddress.map((currentData, index) =>{
            const {addressType,
             contactNo, 
             customerAddressID, 
             defaultAddress, 
             firstName, 
             lastName, 
             shippingAddress,
             shippingCity,
             shippingCityId,
             shippingCityName,
             shippingPinCode,
             shippingState,
             shippingStateId,
             shippingStateName
            } = currentData;
            return(
                <div className='address-col' id={customerAddressID}>
                    <span className='address-type'>{addressType}</span>
                    <p>
                        <span className='customer-name'>{firstName}{lastName}</span>
                        <span className='customer-mobile'>{contactNo}</span>
                    </p>
                    <div className='customeradd'>{shippingAddress},{shippingCity},{shippingState},<strong>{shippingPinCode === 0 ? "" :shippingPinCode}</strong></div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Address