import React, { useState } from 'react';
import AddCourseForm from '../../components/addCourse/addCourseForm'
import AddCourseResponse from '../../components/addCourse/addCourseResponse'
import axios from '../../config/axios'
import { API } from '../../config/api';

const AddCourse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [values, setValues] = useState({})

  const submitForm = async (isValid, values) => {
    if (isValid){
      setIsSubmitted(true);
      setValues(values);
      const response = await axios.post(API.course, {...values},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Accept': 'application',
          'Content-Type': 'application/json'},
      });
      console.log('Success:', response?.data);
      setValues(response?.data); 
     
    }else{
      setIsSubmitted(false);
      setValues({});
    }
      
  }
  return (
    <div>
        {!isSubmitted ? <AddCourseForm submitForm={submitForm} /> : <AddCourseResponse values={values} />}
    </div>
  )
}

export default AddCourse;
