import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBusiness, getBusinesses } from '../../store/businesses';
import { useParams } from 'react-router-dom';

const BusinessPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const business = useSelector((state) => (state.businesses))
  console.log(business)

  useEffect(() => {
    dispatch(getBusinesses())
  }, [dispatch])

  return (
    <>
    { business[id] &&                 // won't run unless businesses[id] is true
      <div className='business-page'>
      <div className='business-page-container'>
        <div>
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
        <div>
          {business[id].phone_number}
        </div>
        <div>
          {business[id].business_website}
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default BusinessPage;
