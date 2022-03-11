import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import Swal from 'sweetalert2'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners'

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';

const validationSchema = Yup.object({
  email:Yup.string().email('Invalid email format').required('required'),
  password:Yup.string().required('required'),
})


const Login = ({history}) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin);
  const {loading, error, userInfo} = userLogin;

  useEffect(()=>{
    if(userInfo){
      history.push('/dashboard')
    
    }else if(error){
      Swal.fire({
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 2000
      })
    }
  },[history, dispatch, userInfo, error])


  const formik = useFormik({
    initialValues:{
        email:'',
        password:''
    },
    onSubmit: async values => {

        await dispatch(login(values.email,values.password))
        
    },
    validationSchema,
})


  return (
    <div className='card-container'>
      <div className='login-container'>

        <Link to='/'><img src="/images/fundall_logo.png" alt="logo"  className='login-logo'/></Link>

        <div className='left-side'>
          <img className='login-img' src="/images/login_img.png" alt="avatar" />

          <div className='text-wrapper'>
            <div className='welcome-container'>
              <span className='welcome-word'>Welcome back!</span>
            </div>  

            <div className='subtext'>
                We miss you.
            </div>  
          </div>  
        </div>
        
        <div className='right-side'>

          <div className='form-container'>
            <div className='login-heading-msg-container'>
              <div className='login-msg-one'>Holla</div>
              <div className='login-msg-two'>Sign in to the vibe!</div>
            </div>
            <form className='login-form' onSubmit={formik.handleSubmit}>

              <div className='login-input-wrapper'>
                <label htmlFor="#email">Email Address or Username</label>
                <input 
                  type="text" 
                  id='email' 
                  name='email'
                  placeholder='Enter Email' 
                  value={formik.values.email}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className={formik.touched.email && formik.errors.email ? "reg-input-error": ""}
                  />
              </div>

              <div className='login-input-wrapper'>
                <label htmlFor="#password">Password</label>
                <input 
                  type="password" 
                  id='password' 
                  placeholder='Enter Password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className={formik.touched.password && formik.errors.password ? "reg-input-error": ""}
                  />
              </div>

              <div className='login-submit-wrapper'>
              <button type='submit' className='login-submit-button'>{loading? <ClipLoader size={12} />: 'Login' }</button>
              </div>

              <div className='login-text-wrapper'>
                <span>Don’t have an account?  </span><Link className='login-login-link' to='/register'>Register Here</Link>
              </div>
            </form>
            <div className='term-container'> 
            <span>By clicking on Login, you agree to our </span>
            <a href='http://#'>Terms & Conditions and Privacy Policy</a>
          </div>
          </div>



        </div>
      </div>  
    </div>
  )
}

export default Login