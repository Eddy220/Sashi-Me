import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBusiness, getBusinesses } from '../../store/businesses';
import { Link, useParams } from 'react-router-dom';
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
        <div className='business-page-inner'>
          <div className='sushiPicContainer'>
            <img className='foodlogo' src='../../sushipic3.jpg'></img>
            <img className='foodlogo' src='../../sushipic2.jpg'></img>
            <img className='foodlogo' src='../../sushipic1.jpg'></img>
          </div>
          <div className ='businessPageInfo'>
            {business[id].name}
          </div>
          <div className ='businessPageInfo'>
            {business[id].address}
          </div>
          <div className ='businessPageInfo'>
            {business[id].city}
          </div>
          <div className ='businessPageInfo'>
            {business[id].state}
          </div>
          <div className ='businessPageInfo'>
            {business[id].phone_number}
          </div>
          <div className ='businessPageInfo'>
            {business[id].business_website}
          </div>
          <Link to={`/businesses/${id}/edit`}>Update</Link>
          <DeleteBusiness/>
        </div>
          <Reviews id={id}/>
      </div>
    </div>
    }
    </>
  )
}

export default BusinessPage;
