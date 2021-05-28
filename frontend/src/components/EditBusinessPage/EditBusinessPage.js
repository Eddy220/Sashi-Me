import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBusiness } from '../../store/businesses';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const EditBusiness = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const owner_id = useSelector((state) => state.session.user.id)
  const businesses = useSelector((state) => state.businesses[id])
  // console.log(owner_id);
  // console.log(businesses)
  const [name, setName] = useState(businesses.name);
  const [address, setAddress] = useState(businesses.address);
  const [city, setCity] = useState(businesses.city);
  const [state, setState] = useState(businesses.state);
  const [phone_number, setPhoneNumber] = useState(businesses.phone_number);
  const [business_website, setBusinessWebsite] = useState(businesses.business_website);

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


  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(name, )
    const payload = {
      name, owner_id, address, city, state, phone_number, business_website, businessId:id
    }

    const business = await dispatch(editBusiness(payload))
    if (business) {
     history.push(`/businesses`)
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
        <button className ='labelsBtn' type='submit'>Update</button>
        <button className ='labelsBtn' type='button' onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
)


}

export default EditBusiness;
