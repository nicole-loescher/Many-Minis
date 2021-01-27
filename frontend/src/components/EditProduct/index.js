import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProduct } from '../../store/product'

export function EditProduct({ product, hideForm }){
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [imgPath, setImgPath] = useState(product.imgPath);
    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const categoriesArr = [
        '1',
        'stone',
        'plastic',
        'metal',
        'hollow',
        'bone',
        'wood',
        'glass',
        'other'
    ]
    const [category_id, setCategory_id] = useState(product.category_id);

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload ={
            id,
            name,
            price,
            description,
            imgPath,
            category_id
        };
        let updatedProduct = await dispatch(updateProduct(payload));
        if(updatedProduct){
            hideForm();
        }
    }
    // if(!showForm){
    //   return null;
    // }
   const id = product.id

    return(
        <div>
            <form className='product-form__form' onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, idx) => <li className='product-form__error' key={idx}>{error}</li>)}
                </ul>
                <input 
                type='hidden'
                value={id}
                />
                <input
                    placeholder='Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                >
                </input>
                <input
                    placeholder='Enter image URL'
                    // className='product-form__img'
                    value={imgPath}
                    onChange={(e) => setImgPath(e.target.value)}
                    type='text'
                >
                </input>
                <input
                    placeholder='Product Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type='number'
                >
                </input>
                <select
                    onChange={e => setCategory_id(e.target.value)}>
                    {categoriesArr.map(category => {
                        return (
                            <option
                                key={category}
                            >
                                {category}
                            </option>
                        )
                    })}
                </select>
                <textarea
                    className='product-form__description'
                    placeholder='Product Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type='text'
                >
                </textarea>
                <button className='product-form__submit'>Submit</button>
            </form>
        </div>
    )
    
}