import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditProduct } from '../EditProduct'
import { deleteProduct } from '../../store/product'
import { addToCart } from '../../store/cart'
import './ProductDetail.css';
import { ReviewForm } from '../ReviewForm';
import { Rating } from '../Rating';
import { Redirect, useHistory } from 'react-router-dom';
import { addReview, getProductReview } from '../../store/review';


export function ProductDetail({ product }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [hideForm, setHideForm ]= useState(true);
    const [hideReview, setHideReview] = useState(true);
    const [hideReviewForm, setHideReviewForm]= useState(true);
    const history = useHistory();

    
    useEffect(()=>{
        dispatch(getProductReview(product.id))
    },[dispatch,product.id])
    const signIn = (e) =>{
        e.preventDefault()
        history.push('/login')
    }
    
        let displayReview;
        if (product.Reviews[0]) {
            displayReview = (
                <p className='high-review'>'{product.Reviews[0].comments}' </p>
            )
        }
        else if(!product.Reviews[0]){
            displayReview = (
                <p className='high-review'> No reviews yet..</p>
            )
        }
            let content;
            let innerContent;
           
        if (!user || user.id !== product.user_id){
            if (!user) {
                innerContent = (
                    <button className='product__add' onClick={signIn}>Sign in to add to cart</button>                  
                )
            }
            else {
                innerContent = (
                    <button className='product__add' onClick={() => dispatch(addToCart(product.id))}>Add to cart</button>
                )
            }
            content = (
                <div>
                    {innerContent}
                    {displayReview}
                    <button className='product__add' onClick={()=> setHideReview(false)}>see more reviews</button>
                </div>
            )
            let innerReviewContent;
            let reviewContent;
            if(!hideReview){
                if(!product.Reviews[0]){
                    reviewContent = (
                        <h2>No reviews yet...</h2>
                        )
                    }
                else if(product.Reviews){
                    reviewContent = (
                           <div>
                               {product.Reviews.map(review => {
                                   return (
                                        <span className='review-list-item' key={review.id}>
                                            <Rating review={review} />
                                        </span>
                                    ) 
                                })}
                           </div>
                    )
                }
                else {
                    reviewContent = (
                         <h2>loading reviews</h2>
                    )
                }
                if(user){
                 innerReviewContent = (
                     <button className='review-buttons' onClick={()=> setHideReviewForm(false)}>Add review</button>
                     )   
                    }
                else if(!user){
                    innerReviewContent = (
                        <button className='review-buttons' onClick={signIn}>Add review</button>
                    )
                }
                content = (
                    <div>
                        {innerContent}
                        {innerReviewContent}
                        <button className='review-buttons' onClick={()=> setHideReview(true)}>Hide reviews</button>
                        {reviewContent}
                    </div> 
                )
            }
            if(!hideReviewForm){
                content = (
                        <ReviewForm product={product} hide={()=> setHideReviewForm(true)} hideForm={()=> setHideReview(true)} />  
                )
            }
        }
        else if(user.id === product.user_id){
            content = (
                <button className='product-edit__button' onClick={(e)=> setHideForm(false)}>
                    Edit
                </button>
            )
            if(!hideForm){
                content=(
                        <EditProduct product={product} hideForm={() => setHideForm(true)} deleteProduct={() =>{
                        dispatch(deleteProduct(product.id))}
                        }/>
                )
            }
        }
    
    return (
        <div className='product' key={`${product.id}.${product.name}`}>
            <img alt='product' className='product__img' src={product.imgPath} />
            <h2 className='product__title'>{product.name}</h2>
            <p className='product__details'>{product.description}</p>
            <h3 className='product__price'>${product.price}</h3>
            {content}
        </div>
    )
}