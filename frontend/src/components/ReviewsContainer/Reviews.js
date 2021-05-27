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
    console.log('After reviews renders')
  }, [dispatch])

  // console.log(reviews)

  // console.log(id)

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

  let filteredReviews = reviews.filter((review) => {
    return review.business_id === +id
  })

  return (
    <div>
      <div className='reviewDiv'> Reviews/Ratings: </div>
        {filteredReviews.map((review) => (
          <p key={review}>
            <div>{review.user_id}</div>
            {review.comment}
            <div>Rating: {review.rating}</div>
          </p>
        ))}
      {/* <form onSubmit={onSubmit}>
          <textarea
            className='newCommentArea'
            rows='5'
            cols='80'
            placeHolder='New comment...'
            value={newComment}
            ></textarea>
      </form> */}
    </div>
  )
}

export default Reviews;
