import React from 'react';
import './Forms.css';
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { z } from "zod"
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { login } from '../../store/slices/authSlice';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formSchema = z.object({
      email: z.string().email( { message: "Invalid email format" }).nonempty({ message: "Email is required" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters" })
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(formSchema)
    });

    const onSubmit = async(data) => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
        const userData = await response.json();
        if(!response.ok){
          toast.error(userData.message || "An error occured during login. Please try again.")
          setIsLoading(false);
          return;
        }

        dispatch(login(userData.user));
        toast.success("Login successful");
        navigate("/account");
      } 
      catch(error) {
        console.error("Login error:", error);
        toast.error("An error occured during login. Please try again.")
      } 
      finally {
        // Ensures that isLoading is set to false after fetch, regardless of how fetch ends.
        setIsLoading(false);
      }
    }

    // Display validation errors sequentially via toast notifications.
    useEffect(() => {
      const errorKeys = Object.keys(errors);
      errorKeys.forEach((key, index) => {
        setTimeout(() => {
          toast.error(errors[key].message);
        }, (index + 1) * 1000);
      })
    }, [errors])

    return (
        <>
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Tippy content="Home" animation="fade" arrow={true}>
                        <h2 className="title"><Link to="/" >Ravenous</Link></h2>
                    </Tippy>
                    <p className="or"><span></span></p>
                    <div>
                        <h2 className="title"> Login</h2>
                    </div>
                    <div className="email-login">
                        <label htmlFor="email"> <b>Email</b></label>
                        <input type="email" placeholder="name@abc.com" name="email" {...register("email")} />
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="6+ characters" name="password" {...register("password")}/>
                    </div>
                    <button className="cta-btn">Login</button>
                    <Link className="forget-pass" to="/signup">Create an Account</Link>
                </form>
            </div>
        </>
    );

}
 
export default LoginForm;