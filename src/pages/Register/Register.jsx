import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import Swal from 'sweetalert2';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners'

import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';

const validationSchema = Yup.object({
  firstName: Yup.string().required('required'),
  lastName: Yup.string().required('required'),
  email:Yup.string().email('Invalid email format').required('required'),
  password:Yup.string().required('required'),
  cPassword:Yup.string().required('required').oneOf([Yup.ref('password'), null], 'passwords must match'),
})

const Register = ({history}) => {
  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);

  const {userReg, success,loading,error} = userRegister;

  useEffect(()=>{
    if(success){
      Swal.fire({
          icon: 'success',
          title: 'User Registered Successfully',
          showConfirmButton: false,
          timer: 2000
        }).then(()=>{
            history.push('/login')
        })
  }else if(error){
    Swal.fire({
      icon: 'error',
      title: error,
      showConfirmButton: false,
      timer: 2000
    })
  }

  },[success, dispatch, history,error])

  const formik = useFormik({
    initialValues:{
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        cPassword:'',
    },

    onSubmit: async values => {

        await dispatch(registerUser({
          firstname:values.firstName,
          lastname:values.lastName,
          email:values.email,
          password:values.password,
          password_confirmation:values.cPassword
        }))
        
    },
    validationSchema,
})

  return (
    <div className='card-container'>
      <div className='register-container'>

        <Link to='/'><img src="/images/fundall_logo.png" alt="logo"  className='reg-logo'/></Link>

        <div className='left-side'>
          <img className='reg-img' src="/images/intro_img.png" alt="avatar" />

          <div className='text-wrapper'>
            <div className='welcome-container'>
              <span className='welcome-word'>Welcome!</span> Let’s get to know you.  
            </div>  

            <div className='subtext'>
            Your first step toward a better financial lifestyle starts here.  
            </div>  
          </div>  
        </div>
        
        <div className='right-side'>

          <div className='form-container'>

            <form onSubmit={formik.handleSubmit}>

              <div className='name-input-wrapper'>

                <div className='first-name-wrapper'>
                  <label htmlFor="#first-name">First Name</label>
                  <input 
                    type="text" 
                    id='first-name'
                    name='firstName' 
                    placeholder='Enter First Name'
                    value={formik.values.firstName}
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    className={formik.touched.firstName && formik.errors.firstName ? "reg-input-error": ""}
                    />
                </div>

                <div className='last-name-wrapper'>
                  <label htmlFor="#last-name">Last Name</label>
                  <input 
                    type="text" 
                    id='last-name' 
                    name='lastName'
                    placeholder='Enter Last Name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    className={formik.touched.lastName && formik.errors.lastName ? "reg-input-error": ""}
                    />
                </div>

              </div>


              <div className='reg-input-wrapper'>
                <label htmlFor="#email">Email Address</label>
                <input 
                  type="email" 
                  id='email' 
                  placeholder='Enter Email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className={formik.touched.email && formik.errors.email ? "reg-input-error": ""}
                  />
              </div>

              <div className='reg-input-wrapper'>
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

              <div className='reg-input-wrapper'>
                <label htmlFor="#c-password">Confirm Password</label>
                <input 
                  type="password" 
                  id='c-password' 
                  placeholder='Confirm Password'
                  name='cPassword'
                  value={formik.values.cPassword}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  className={formik.touched.cPassword && formik.errors.cPassword ? "reg-input-error": ""}
                  />
              </div>

              <div className='reg-submit-wrapper'>
              <button type='submit' className='reg-submit-button'>{loading? <ClipLoader size={12} />: 'Sign up'}</button>
              </div>

              <div className='login-text-wrapper'>
                <span>Already have an account?  </span><Link className='reg-login-link' to='/login'>Login Here</Link>
              </div>
            </form>
          </div>

          <div className='term-container'> 
            <span>By clicking on Login, you agree to our </span>
            <a href='http://#'>Terms & Conditions and Privacy Policy</a>
          </div>

        </div>
      </div>  
    </div>
  )
}

export default Register