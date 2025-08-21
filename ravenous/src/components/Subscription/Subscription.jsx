import { React, useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

function Subscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //Check is email is empty.
    if (email == ""){
      toast.error("Please enter your email address");
      return;
    }
    //Success message
    toast.success("You've been successfully subscribed!", {
      style: {
        border: '1px solid #cca353',
        padding: '16px',
        color: '#cca353',
      },
      iconTheme: {
        primary: '#cca353',
        secondary: '#FFFAEE',
      },
    });
    //Reset email state to empty string.
    setEmail('');
  };
  
    return (
      <div className="mx-auto">
        <div className="relative isolate overflow-hidden px-6 py-10 shadow bg-[#FFE7B9]">
          
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Keep Updated
          </h2>
  
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8">
            Keep pace with Hotel advancements! Join our mailing list for selective, noteworthy updates.
          </p>
  
          <form className="mx-auto mt-10 flex max-w-md gap-x-4 " onSubmit={handleSubmit}>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)} 
              id="email-address" 
              name="email" 
              type="email" 
              autoComplete="email"
              required 
              className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 shadow-sm sm:text-sm sm:leading-6" 
              placeholder="Enter your email" 
            />
  
            <button 
              type="submit"
              className="flex-none rounded-md bg-[#cca353] px-3.5 py-2.5 text-sm font-semibold border-0 text-white shadow-sm hover:bg-[#a7874b]"
            >
              Notify me
            </button>
          </form>
  
        </div>
      </div>
    );
  }
  
  export default Subscription;