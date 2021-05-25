import './BusinessesContainer.css';
import { useEffect } from 'react'
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';

const BusinessesContainer = () => {
  // Declare variables from hooks
  const dispatch = useDispatch();
  const businesses = useSelector((state) => Object.values(state.businesses))
  // console.log(businesses)
  // Use a react hook and cause a side effect
  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  return (
    <div className='businesses'>
      <div className='outerContainer'>
        {businesses.map(business =>
          <p key={business.name}>
            <div className='businessContainer'>
              <div className='businessName'>
                {business.name}
              </div>
              <div>
                {business.phone_number}
              </div>
              <div className='businessAddress'>
                {business.address}
              </div>
            </div>
          </p>
          )}
      </div>
    </div>
  )
}

export default BusinessesContainer;
