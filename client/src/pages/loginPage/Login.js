import React, {useState} from 'react'
import LoginForm from '../../components/login/LoginForm'
//import FormPositive from '../../components/registerForm/FormPositive'

const Login = () => {
    return (
        <div>
            <LoginForm />
        </div>
  /*const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})

  function submitForm(isValid, values){
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      fetch("/login", {method: "POST",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(values)})
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
     
    }else{
      setIsSubmitted(false);
      setValues({});
    }
      
  }
  return (
    <div>
        {!isSubmitted ? <FormSignup submitForm={submitForm} /> : <FormPositive values={values} />}
    </div>*/
  )
}

export default Login;