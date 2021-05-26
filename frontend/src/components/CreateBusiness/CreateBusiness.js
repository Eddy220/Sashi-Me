import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBusiness, getBusinesses } from '../../store/businesses';
import './CreateBusiness.css';

const CreateBusiness = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const businesses = useSelector((state) => Object.values(state.businesses));
  const owner_id = useSelector((state) => state.session.user.id)
  // goes into session and grabs that session user's state,
  // ? if this exists, grabs owner's id and sets to ownerId
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone_number, setPhoneNumber] = useState('(xxx)xxx-xxxx');
  const [business_website, setBusinessWebsite] = useState('');

  const updateName = (event) => {
    setName(event.target.value)
  }

  const updateAddress = (event) => {
    setAddress(event.target.value)
  }

  const updateCity = (event) => {
    setCity(event.target.value)
  }

  const updateState = (event) => {
    setState(event.target.value)
  }

  const updatePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const updateBusinessWebsite = (event) => {
    setBusinessWebsite(event.target.value)
  }


  // Use a react hook and cause a side effect
  useEffect(() => {
    dispatch(getBusinesses())
  }, [dispatch]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    const payloadData = {
      name, owner_id, address, city, state, phone_number, business_website
    };

    const business = await dispatch(createBusiness(payloadData));
    console.log('business created', business)
    if (business) {
      history.push(`/businesses/${business.id}`);
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/businesses');
  };

  return(
    <div className='create-container'>
      <form className='createForm' onSubmit={handleSubmit}>
        <label className ='labels'> Restaurant Name:
          <input type='textarea' onChange={updateName}/>
        </label>
        <label className ='labels'> Street Address:
          <input type='textarea' onChange={updateAddress}/>
        </label>
        <label className ='labels'> City:
          <input type='textarea' onChange={updateCity}/>
        </label>
        <label className ='labels'> State, Zipcode:
          <input type='textarea' onChange={updateState}/>
        </label>
        <label className ='labels'> Phone Number:
          <input type='textarea' onChange={updatePhoneNumber}/>
        </label>
        <label className ='labels'> Website:
          <input type='textarea' onChange={updateBusinessWebsite}/>
        </label>
        <button className ='labelsBtn' type='submit'>Open your restaurant!</button>
        <button className ='labelsBtn' type='button' onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
)

}

export default CreateBusiness;
