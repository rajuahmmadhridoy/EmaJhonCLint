import React from "react";
import { useForm } from "react-hook-form";

const Products = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => {
  //   const productData = {
  //     firstName:data.firstName,
  //     lastName:data.lastName,
  //     email:data.email
  //   }
  //   console.log(productData);
  //   fetch("http://localhost:4000/addProduce", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(productData),
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };

const onSubmit = (data) => {
  const eventData = {
    name: data.firstName,
    quantity: data.lastName,
    price: data.email
  };
  const url = `http://localhost:4000/addProduce`;

  console.log(eventData);
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(eventData),
  }).then((res) => {
    console.log("res data", res);
  });
};


  return (
    <div>
      {/* <button onClick={productAdd}>Product Add</button> */}
      <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, minLength: 5 })} />
      {errors.firstName?.type === 'required' && "First name is required"}
      <input {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
      {errors.lastName?.type === 'required' && "lastName name is required"}
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
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <input type="submit"  />
    </form>
    </div>
  );
};

export default Products;
