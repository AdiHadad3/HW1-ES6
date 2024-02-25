import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login({loginUser}) {

  const [failL, setFailL] = useState('');
  const [formData, setFormData] = useState({
    loginUserName: '',
    loginPassword: '',
  });
  const [formErrors, setFormErrors] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
 

  //update changes
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  //on trying to login, set errors and the submition
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true)
  };

  useEffect(()=>{
    if(Object.keys(formErrors).length==0 && isSubmit){
      const success=loginUser(formData.loginUserName,formData.loginPassword);
      if(!success){
        setFailL(`The user does'nt not exist or incorrect password`);
      }
      else setFailL('');
    }
    },[formErrors])
  
    //check and update errors
    const validate=()=>{
    const errors={};
    if(formData.loginUserName==""){
      errors.loginUserName="This field is required!"
      return errors;
    }
    if(formData.loginPassword==""){
      errors.loginPassword="This field is required!"
      return errors;
    }
    return errors;
  }

  return (
    <div>
    <form onSubmit={handleSubmit} id="regForm">
      <h2>Login</h2>
      <div>
        <TextField
          label="User Name"
          id="loginUserName"
          value={formData.loginUserName}
          onChange={handleChange}
          variant="outlined"
          required
          helperText={formErrors.loginUserName} 
        />
        <br /><br />
        <TextField
          type='password'
          label="Password"
          id="loginPassword"
          value={formData.loginPassword}
          onChange={handleChange}
          variant="outlined"
          required
          helperText={formErrors.loginPassword} 
        />
      </div>
      <br />
      <Button 
      type="submit" 
      variant="contained" 
      color="primary"
      onClick={handleSubmit}>
        Login
      </Button>
      <p>{failL}</p>
    </form>
    </div>
  );
}
