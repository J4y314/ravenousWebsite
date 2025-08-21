import { useEffect, useState } from 'react';
import './Forms.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';

// Use zod to create a schema for the signup form.
// Validate: firstName, lastName, email, phoneNumber, designation, password, confirmPassword.
// Apply specific validation rules (e.g., minimum length, valid email format).
// Use .refine() to ensure password and confirmPassword match.
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }).nonempty({ message: "Email is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  designation: z.string().min(1, { message: "Password must be at least 6 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Use the useForm hook from react-hook-form and pass in zodResolver with your schema.
  // This will manage form state and validation automatically.
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Use a useEffect hook to iterate over the errors object.
  // Sequentially display toast notifications for each validation error.
  useEffect(() => {
    const errorKeys = Object.keys(errors);
          errorKeys.forEach((key, index) => {
            setTimeout(() => {
              toast.error(errors[key].message);
            }, (index + 1) * 1000);
          })
  }, [errors]);

  // Write an onSubmit function that runs when the form is successfully validated.
  // Compare password and confirmPassword; if they don't match, display an error toast.
  // If validation passes, simulate the signup logic (e.g., saving user data, dispatching login, navigating).
  // Optionally, wrap your logic in a try-catch block to handle errors.
  const onSubmit = async(data) => {
    //Another check to ensure that password and confirm password are identical.
    if (data.password != data.confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const userData = await response.json();
      if(!response.ok){
        toast.error(userData.message || "An error occured during signup. Please try again.")
        setIsLoading(false);
        return;
      }

      // //Normally we will use an api call to store data, but we can store it in localStoarge for simulation purposes
      // console.log("Signup data:", data);
      // localStorage.setItem("user", JSON.stringify(data));

      // // Automatically login after signup.
      // dispatch(login(data));
      // navigate("/account");

      //We can also redirect to the login page to test login easier.
      toast.success("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occured during signup. Please try again.")
    } finally {
      // Ensures that isLoading is set to false after fetch, regardless of how fetch ends.
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tippy content="Home" animation="fade" arrow={true}>
          <h2 className="title"><Link to="/">Ravenous</Link></h2>
        </Tippy>
        <div>
          <h2 className="title">Sign up</h2>
        </div>
        <div className="email-login">
          <label htmlFor="firstName"><b>First Name</b></label>
          <input type="text" placeholder="John" {...register("firstName")}/>
          
          <label htmlFor="lastName"><b>Last Name</b></label>
          <input type="text" placeholder="Doe" {...register("lastName")}/>
          
          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="name@abc.com" {...register("email")}/>
          
          <label htmlFor="phoneNumber"><b>Phone Number</b></label>
          <input type="text" placeholder="1234567890" {...register("phoneNumber")}/>
          
          <label htmlFor="designation"><b>Designation</b></label>
          <input type="text" placeholder="Your job title" {...register("designation")}/>
          
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="6+ characters" {...register("password")}/>
          
          <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
          <input type="password" placeholder="Repeat your password" {...register("confirmPassword")}/>
        </div>
        <button type="submit" className="cta-btn">Sign up</button>
        <p className="subtitle">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default SignupForm;
