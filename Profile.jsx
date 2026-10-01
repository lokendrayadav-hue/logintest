import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context/Context'

const Profile = () => {
  const {AuthLoggedIn,loading, profileData, ProfileUpdate} = useGlobalContext();
  const [fieldShow, setFieldShow] = useState(false);
  const [updateBtn, setupdateBtn] = useState(false);
  const [ProfileUpdateData, setProfileUpdateData] = useState({    
      customerName: "",
      emailId: ""
  });
  const setField = () =>{
    setFieldShow(true)
    setupdateBtn(true)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileUpdateData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveHendaler = () =>{
      setFieldShow(false); 
      setupdateBtn(false);
      //console.log(ProfileUpdateData) 
      ProfileUpdate(ProfileUpdateData);
      
  }

  useEffect(() => {
    if (profileData) {
      setProfileUpdateData({
        customerName: profileData.customerName || '',
        emailId: profileData.emailId || '',
      });
    }
  }, [profileData]);
  
  return (
    <div>
      {loading ? <h1>...Loading</h1> :
      <div className='form-box'>
        <div className='form-field'> 
              {fieldShow === true && profileData.customerName === null ?           
              <input type='text'
               name='customerName'              
               placeholder='Full Name' 
               className='forrm-control' required
               onChange={handleChange}
               /> : 
               <input type='text'
               value={profileData.customerName} 
               placeholder='Full Name' 
               className='forrm-control' readOnly
               />
               
              }             
          </div>
           {/* <button onClick={() => setFieldShow(true)}>Edit Profile</button>
           <button onClick={saveHendaler}>Save</button> */}
          <div className='form-field'>           
            <input type='number' value={profileData.phoneNo} placeholder='Mobile Number' className='forrm-control' readOnly/>
          </div>
          <div className='form-field'>
              {fieldShow === true && profileData.emailId === null ?
              <input type='email'
               name='emailId'
               value={ProfileUpdateData.emailId}              
               placeholder='Email Id' 
               className='forrm-control' required
               onChange={handleChange}
               /> : 
              <input type='text'
               value={profileData.emailId} 
               placeholder='Email Id' 
               className='forrm-control' readOnly
               />
              }              
          </div>
          {profileData.emailId === null || profileData.customerName === null ? <button onClick={updateBtn ? saveHendaler : setField}>{updateBtn ? "Update Profile" : "Edit Profile"}</button>:""}
        </div> }
    </div>
  )
}

export default Profile
