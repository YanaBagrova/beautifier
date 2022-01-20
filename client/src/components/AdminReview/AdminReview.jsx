import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initReviewsAC } from '../../redux/actionCreators/reviewsAC/reviewsAC';
import ReviewCardDelete from './ReviewCardDelete';
import { Link } from 'react-router-dom';
function AdminReview(props) {

  const dispatch = useDispatch()
  const { reviews } = useSelector(state => state.reviewsReducer)
  const { session } = useSelector((state) => state.sessionReducer)
  const newReviews = reviews.filter((el) => el.isValid != false)
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', newReviews)
  const falseReviews = reviews.filter((el) => el.isValid == false)
  console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', falseReviews)


  useEffect(() => {
    (async () => {
      const response = await fetch(`/reviews`)
      const res = await response.json();
      dispatch(initReviewsAC({ res }))
    })();
  }, [dispatch])


  return (
    <div>
      { session.isAdmin ?
      <>
      <Link to="/admincabinet">Назад</Link>
      <ul>
        {newReviews.length ? newReviews.map(review => <ReviewCardDelete key={review.id} name={review.name} text={review.text} id={review.id} isValid={review.isValid} />) : <>No Reviews</> }
      </ul>
        <p>Проверить</p>
        <ul>
      {falseReviews.length ? falseReviews.map(review => <ReviewCardDelete key={review.id} name={review.name} text={review.text} id={review.id} isValid={review.isValid} />) : <>No Reviews</> }
        </ul>
      {/* {newReview ? <AddReviewForm setNewReview={setNewReview} /> : <button onClick={() => setNewReview(true)}>Оставить отзыв</button>} */}
      </> :
      <div>Страница не найдена</div>
      }
    </div>
  );
}

export default AdminReview;
