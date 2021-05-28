import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBusiness } from '../../store/businesses';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const DeleteBusiness = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const onSubmit = async(event) => {
    event.preventDefault();

    await dispatch(deleteBusiness(id))
    console.log('businessDeleted')
    history.push('/')
  }

  return(
    <button className='deleteBtn' onClick={onSubmit}>
      Delete?
    </button>
  )
}

export default DeleteBusiness
