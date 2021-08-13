
import './Product.scss'
import { Link } from "react-router-dom";

const Product = (props) => {
    // console.log(props.Product);

    // const name = props?.pd?.name;
    // const {img} = props?.pd;
    // console.log(img)
    return (
        <div className="singleProduct d-flex">
            {props.pd && <>
                <div className="singleProductImg">
                    <img className="singleProductImgImg" src={props.pd.img} alt="" />

                </div>
                <div className="singleProductContent">
                    <h5>name: {props?.pd?.name}</h5>
                    <p>Price: $ {props?.pd?.price}</p>
                    <p>Category: {props?.pd?.category}</p>
                    {
                        props.showAddToCart && <button onClick={() => props.handleAddProduct(props.pd)} className="singleProductBtn">Buy Now</button>
                    }
                    {
                        props.showMore && <Link to={"/product/" + props.pd.key}><p>show more</p></Link>
                    }
                </div>
            </>}

        </div>
    );
};

export default Product;