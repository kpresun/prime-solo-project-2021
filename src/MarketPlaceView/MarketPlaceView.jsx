import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import StarIcon from '@material-ui/icons/Star';

function Marketplace() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productReducer);
    const userBookmark = useSelector(store => store.bookmarkReducer);
    const currentUser = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS'});
        // dispatch({ type: 'FETCH_BOOKMARKS'}) maybe for the conditional rendering
    }, []);

    // handles adding and deleting item to bookmark: STILL NEED TO CREATE DELETE ROUTE
    const bookmarkClick = (product) => {
        if (product) {
            dispatch({ type: 'ADD_TO_BOOKMARK', payload: product})
        } else {
            dispatch({ type: 'DELETE_FROM_BOOKMARK', payload: product})
        }
        // history.push("/bookmark"); testing only!
    }

    const contactSeller = (userId) => {
        console.log('--LOG-- the currentUser is:', currentUser);
        history.push(`/user/detail/${userId}`);
    }

    return(
        <section>
            <h1>This is the marketplace view</h1>
            <article>
                {allProducts.map(product => {
                    return (
                        <div key={product.id} >
                            <img src={product.image_url} height="200" />
                            <h2>{product.name}</h2>
                            <h3>Price: ${product.price}</h3>
                            <h4>Description: {product.description}</h4>
                            <h4>user id is:{product.user_id}</h4>
                            <h4>product id is: {product.id}</h4>
                            <button onClick={() =>{contactSeller(currentUser.id)}}>Contact</button>
                            <button onClick={() => {bookmarkClick(product)}}>Bookmark</button>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default Marketplace;


// maybe create a boolean for bookmark table

{/* <StarIcon onClick={() => {bookmarkClick(product)}}>bookmark</StarIcon> */}