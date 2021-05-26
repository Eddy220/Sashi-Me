import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, createReview } from '../../store/reviews';
import { useParams, useHistory } from 'react-router-dom';
import './Reviews.css';

const Reviews = ({id}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector((state) => Object.values(state.reviews))

  useEffect(() => {
    dispatch(getReviews())
  }, [dispatch])

  console.log(reviews)

  console.log(id)

// const onSubmit = async(event) => {
//   event.preventDefault();
//   const payloadData = {
//     user_id, comment, rating, business_id
//   }

//   const review = await dispatch(createReview(payloadData))
//   if(review) {
//     history.push('/businesses')
//   }
// }


  reviews.map((review) => {
    if (review.business_id === id) {
      return review
    }
  })

  return (
    <div>
      <div className=''> Reviews </div>
        {reviews.map((review) => (
          <p key={review}>
            {review.comment}
          </p>
        ))}
    </div>
  )
}

export default Reviews;
