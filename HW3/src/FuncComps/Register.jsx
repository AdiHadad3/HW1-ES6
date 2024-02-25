import React from 'react'
import { useState, useEffect} from "react";

export default function Register({registerUser}){
    const cities = [
        'נתניה',
        'תל אביב',
        'רמת גן',
        'ירושלים',
        'הרצליה',
        'חיפה',
        'באר שבע',
        'אילת'
    ];
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '', 
        city: '',
        street: '',
        homeNumber: '',
        dateOfBirth: '',
        img: '',
        email: '', //The unique value
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    
    //update the fields useState
    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData,[id]: value});
    };
    
    //check the form after registration
    const handleSubmit = (event)=>{
        event.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    //on every change of the errors, if the form is proper it will save this user
    useEffect(()=>{
    if(Object.keys(formErrors).length==0 && isSubmit){
        registerUser(formData);
    }
    },[formErrors])

    //After adding new img, add the reader obj and update the ing useState
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();//read and save as base 64
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFormData({...formData, img: reader.result});
        };
    };
    
    //checking every field according to the rules and add to the errors object
    const validate= () => {
        const errors={};
        //user name
        const regexUserName= /^[a-zA-Z0-9!@#$%^&*)()]{1,60}$/
        if(!regexUserName.test(formData.userName)){
            errors.userName="Incorrect user name!";
        }
        //password
        const regexPassword= /^(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()]{7,12}$/
        if(!regexPassword.test(formData.password)){
            errors.password="Incorrect password";
        }
        //confirm password
        if(formData.password!=formData.confirmPassword){
            errors.confirmPassword="The password doesn't match the previous password!";
        }
        //first name
        const regexOnlyTxt = /^[A-Za-zא-ת]+$/;
        if(!regexOnlyTxt.test(formData.firstName)){
            errors.firstName="first name must be text only!";
        }
        //last name
        if(!regexOnlyTxt.test(formData.lastName)){
            errors.lastName="last name must be text only!";
        }
        //email
        const regexEmail = /^[a-zA-Z!#$%^&*()]+@[a-zA-Z!#$%^&*()]+\.com$/
        if(!regexEmail.test(formData.email)){
            errors.email="Incorrect email address!";
        }
        //date of birth
        if(!validateDate(formData.dateOfBirth)){
            errors.dateOfBirth="Your age must be greater than 18 and less than 120!"
        }
        //city
        if (!cities.includes(formData.city)){
            errors.city="The city must be selected from the list!"
        }
        //street
        const regexStreet=/^[א-ת\s]*$/
        if(!regexStreet.test(formData.street)){
            errors.street="Incorrect street!";
        }
        //home number
        if(formData.homeNumber<0){
            errors.homeNumber="Incorrect home number!";
        }
        return errors;
    }
    
    //checking if the date of birth is proper
    const validateDate = (date) => {
        const [year, month, day] = date.split('-');
        const selectedDate = new Date(year, month - 1, day);
        const today = new Date();
        const difference = today.getTime()-selectedDate.getTime();
        const YearsDifference = difference / (1000 * 3600 * 24 * 365.25);
        if(YearsDifference<18||YearsDifference>120){
            return false;
        }
        return true;
    }
      
    return (
        <div>
        <form onSubmit={handleSubmit} id="form">
            <h2>Registration Form</h2>
            <div  className="form-group">
            <label htmlFor="firstName">First name: </label>
            <input
            type="text" 
            placeholder="First" 
            value={formData.firstName}
            id="firstName"
            onChange={handleChange}
            required
            />
            <p>{formErrors.firstName}</p>
            </div>
            <div className="form-group">
            <label htmlFor="lastName">Last name: </label>
            <input 
            type="text" 
            placeholder="Last" 
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.lastName}</p>
            </div>
            <div  className="form-group">
            <label htmlFor="userName">User name: </label>
            <input 
            type="text" 
            placeholder="User" 
            id="userName" 
            maxLength={60}
            value={formData.userName}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.userName}</p>
            </div>
            <div className="form-group">
            <label htmlFor="cityList">City: </label>
            <input
            type="text" 
            list="cityList"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
            />
            <datalist id="cityList">
                {cities.map(city => <option  key={city} value={city}/>
                )}
            </datalist><br />
            <p>{formErrors.city}</p>
            </div>
            <div className="form-group">
            <label htmlFor="street">Street name: </label>
            <input 
            type="text" 
            placeholder="street"
            id="street"
            value={formData.street}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.street}</p>
            </div>
            <div className="form-group">
            <label htmlFor="homeNumber">Home number: </label>
            <input 
            type="number"
            placeholder="number"
            id="homeNumber"
            value={formData.homeNumber}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.homeNumber}</p>
            </div>
            <div className="form-group">
            <label htmlFor="dateOfBirth">Date of birth: </label>
            <input 
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.dateOfBirth}</p>
            </div>
            <div className="form-group">
            <label htmlFor="img">Personal image: </label>
            <input 
            type="file" 
            id="img"
            accept="image/jpeg,image/jpg" 
            onChange={handleFileChange}
            /><br />
            </div>
            <img src={formData.img}/>
            <div  className="form-group">
            <label htmlFor="email">Email: </label>
            <input 
            type="email" 
            placeholder="Email" 
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.email}</p>
            </div>
            <div  className="form-group">
            <label htmlFor="password">Password: </label>
            <input 
            type="password" 
            placeholder="password" 
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.password}</p>
            </div>
            <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password: </label>
            <input 
            type="password" 
            placeholder="confirm" 
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            /><br />
            <p>{formErrors.confirmPassword}</p>
            </div>
            <button className="button">Register</button>
        </form>
        </div>
    )
} 