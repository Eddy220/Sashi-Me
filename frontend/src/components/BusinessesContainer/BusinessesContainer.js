import './BusinessesContainer.css';
import { useEffect } from 'react'
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <Link to={`/businesses/${business.id}`}>
            <div className='businessContainer'>
              <div className='businessInfo'>
                {business.name}
              </div>
              <div className ='businessInfo'>
                {business.phone_number}
              </div>
              <div className='businessInfo'>
                {business.address}
              </div>
            </div>
            </Link>
          </p>
          )}
      </div>
    </div>
  )
}

export default BusinessesContainer;
