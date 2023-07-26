import React from 'react'
import { premiumPayment,premiumPaymentSuccess } from '../../Axios/Services/UserServices'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify'
import { UserPremium  } from '../../Redux/UserSlice'
import { useDispatch } from 'react-redux'
const OfferComp = () => {
    const dispatch =useDispatch()
    const token = useSelector(state=>state.UserReducer.accessToken)
    const navigate= useNavigate()
    // this will be called after that razorpay page
    const handlePaymentSuccess = async (response)=>{
        try{
            const data= {"response":JSON.stringify(response)}
            
            const values= await premiumPaymentSuccess(token,data)
            console.log(values);
            dispatch(UserPremium())
            navigate('/')
            toast.success(values?.message)
        }
        catch(error){
            console.log(error);
            // navigate('/expired/')
        }
    }
 // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };
  const showRazorpay = async () =>{
    const res = await loadScript();
    
            
        const response= await premiumPayment(token)
        toast.success(response?.message)
    
     // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
        key_id: import.meta.env.VITE_RAZORPAY_PUBLIC_KEY, 
        key_secret: import.meta.env.VITE_RAZORPAY_SECRET_KEY,
        amount: response.payment.amount,
        currency: "INR",
        name: "Bon Appetite",
        description: "Test teansaction",
        image: "", // add image url 
        order_id: response.payment.id,
        handler: function (response) {
          // we will handle success by calling handlePaymentSuccess method and
          // will pass the response that we've got from razorpay
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    };


  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Unlock Premium Features</h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Enhance your cooking experience with our premium subscription.</p>
        </div>
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">Premium Plan</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Get access to exclusive recipes and features with our Premium Plan.</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹100</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            
            <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Access to Exclusive Recipes</span>
                </li>
                <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>No Ads, Distractions</span>
                </li>
                <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Priority Customer Support</span>
                </li>
                <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span>Unlock Premium Recipes</span>
                </li>
            </ul>
            <button onClick={showRazorpay} className="text-white bg-btnColor hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900">Get Premium</button>
        </div>
    </div>
</section>

  )
}

export default OfferComp