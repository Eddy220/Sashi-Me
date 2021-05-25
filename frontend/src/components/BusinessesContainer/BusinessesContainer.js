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
    <div className='businesses'> Check out these sushi spots!
      <ul>
        {businesses.map(business =>
          <p key={business.name}>
            <div>
            {business.name}

            </div>
            {business.address}
          </p>
          )}
      </ul>
    </div>
  )
}

export default BusinessesContainer;
