import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBusiness, getBusinesses } from '../../store/businesses';
import { useParams } from 'react-router-dom';
import './BusinessPage.css';
import Reviews from '../ReviewsContainer/Reviews.js';
import DeleteBusiness from './DeleteBusinessPage';


const BusinessPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const business = useSelector((state) => (state.businesses))
  // console.log(id)

  useEffect(() => {
    dispatch(getBusinesses())
  }, [dispatch])

  return (
    <>
    { business[id] &&                 // won't run unless businesses[id] is true
      <div className='business-page'>
      <div className='business-page-container'>
        <div className ='businessName'>
          {business[id].name}
        </div>
        <div>
          {business[id].address}
        </div>
        <div>
          {business[id].city}
        </div>
        <div>
          {business[id].state}
        </div>
        <div className='right'>
          {business[id].phone_number}
        </div>
        <div className='right'>
          {business[id].business_website}
        </div>
        <DeleteBusiness/>
        <Reviews id={id}/>
      </div>
    </div>
    }
    </>
  )
}

export default BusinessPage;
