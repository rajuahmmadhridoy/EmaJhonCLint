import React, { useContext } from "react";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { getDatabaseCart } from "../../utilities/databaseManager";

const Shipment = () => {
  let [logedIn, setLogedIn] = useContext(UserContext);

  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => {
    const saveCart = getDatabaseCart();
    const orderDetails = {...logedIn,products:saveCart,shipment:data,orderTime:new Date()}
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, minLength: 5 })} value={logedIn.name} />
      {errors.firstName?.type === 'required' && "First name is required"}
      {/* <input {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
      {errors.lastName?.type === 'required' && "lastName name is required"} */}
      <input
        id="email"
        {...register("email", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
          }
        })}
        type="email"
        value={logedIn.email}
      />
      <input type="number" name="number" id="" />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <input type="submit" value="login" />
    </form>
  );
};

export default Shipment;
