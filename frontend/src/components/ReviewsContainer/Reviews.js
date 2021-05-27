import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, createReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import './Reviews.css';

const Reviews = ({id}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector((state) => Object.values(state.reviews))
  const user_id = useSelector((state) => state.session.user.id)
  const user = useSelector((state) => state.session.user.username)
  // const business_id = useSelector((state) => (state.businesses))
  // console.log(business_id)
  const [comment, setNewReview] = useState('');
  const [rating, setNewRating] = useState('');

  // console.log(reviews)

  // console.log(user)


  const updateReview = (event) => {
    setNewReview(event.target.value)
  }

  const updateRating = (event) => {
    setNewRating(event.target.value)
  }

  useEffect(() => {
    dispatch(getReviews())
    console.log('After reviews renders')
  }, [dispatch])

  const onSubmit = async(event) => {
    // event.preventDefault();
    const ratingNum = +rating;
    const payloadData = {
      user_id, comment, rating:ratingNum, business_id:+id
    }

    await dispatch(createReview(payloadData))
    setNewReview('');
  }

  let filteredReviews = reviews.filter((review) => {
    return review.business_id === +id
  })

  return (
    <div>
      <div className='reviewDiv'> Reviews/Ratings: </div>
        {filteredReviews.map((review) => (
          <p key={review}>
            <div>{user} says:</div>
            {review.comment}
            <div>Rating: {review.rating}</div>
          </p>
        ))}
      <form onSubmit={onSubmit}>
          <textarea
            className='commentText'
            rows='4'
            cols='50'
            placeholder='Make a review...'
            value={comment}
            onChange={(event) => setNewReview(event.target.value)}
            ></textarea>
          <select onChange={(event) => setNewRating(event.target.value)}>
            <option value='0'>Give us a rating!</option>
            <option value='5'>5 ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ </option>
            <option value='4'>4 ⭐️ ⭐️ ⭐️ ⭐️ </option>
            <option value='3'>3 ⭐️ ⭐️ ⭐️ </option>
            <option value='2'>2 ⭐️ ⭐️ </option>
            <option value='1'>1 ⭐️ </option>
          </select>
          <button className='submitReview' type='submit'>
            Submit
          </button>
      </form>
    </div>
  )
}

export default Reviews;
