import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Link, useLocation } from 'react-router-dom'
import {IoChevronBackCircleSharp, IoChevronForwardCircleSharp} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail } from '../../redux/actions/userActions'



const Dashboard = () => {


    const [itemOne, setItemOne] = useState({
        itemOneName:'',
        itemOneAmount:0
    })
    const [itemTwo, setItemTwo] = useState({
        itemTwoName:'',
        itemTwoAmount:0
    })
    const [itemThree, setItemThree] = useState({
        itemThreeName:'',
        itemThreeAmount:0
    })
    const [expenses, setExpenses] = useState([]);

    useEffect(()=>{
    if(localStorage.getItem('expense-list')){
        setExpenses(JSON.parse(localStorage.getItem('expense-list')))
    }        
    },[])

    // if(localStorage.getItem('expense-list')){
    //     setExpenses(JSON.parse(localStorage.getItem('expense-list')))
    // }

    const pathname = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])


    const dispatch = useDispatch();

    const userDetail = useSelector(state=>state.userDetail);

    const {userProfile, loading, error} = userDetail;

    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(()=>{
        dispatch(getUserDetail())
    },[dispatch]);

    useEffect(()=>{
        localStorage.setItem('expense-list', JSON.stringify(expenses))
    },[expenses])



    const handleItemOneChange = (e) => {
        setItemOne({...itemOne, [e.target.name]:e.target.value});

    }

    const handleItemTwoChange = (e) => {
        setItemTwo({...itemTwo, [e.target.name]:e.target.value});

    }


    const handleBlur = (e) => {
        setTotalAmt(prev =>e.target.value !== '' ? prev + Number(e.target.value): prev + 0)
    }

    const handleItemThreeChange = (e) => {
        setItemThree({...itemThree, [e.target.name]:e.target.value});
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        setExpenses([ 
                {name:itemOne.itemOneName,amount:itemOne.itemOneAmount},
                {name:itemTwo.itemTwoName,amount:itemTwo.itemTwoAmount},
                {name:itemThree.itemThreeName,amount:itemThree.itemThreeAmount}
            ])

    }

  return (
    <div className='card-container'>
        <div className='dashboard-wrapper'>
            <Link className='reg-logo' to='/'><img src="/images/fundall_logo.png" alt="logo"  className='reg-logo'/></Link>
            
            <div className='dashboard-left'>

                <div className='profile-info'>
                    {!userProfile.avatar ? 
                    <img className='profile-img' src={userProfile?.avatar} alt="placeholder" />
                    :
                    <img className='profile-img' src={"/images/profile_placeholder.png"} alt="placeholder" />
                    }
                    <div className='name-wrapper'>
                        <div className='name'>{userProfile?.firstname}{' '}{userProfile?.lastname}</div>
                        <div className='email'>{userProfile?.email}</div>
                    </div>
                </div>

                <div className='expense-summary-container'>
                    <div className='expense-detail'>
                        <div className='text-one'>Target Monthly Expenses</div>
                        
                        <div className='text-two'>{userProfile?.spent?.toLocaleString()}</div>
                    </div>

                    <div className='progress-bar'></div>
                </div>


                <div className='expense-card'>
                    <div className='expense-card-heading'>Daily Expenses Summary</div>

                    <div className='card-expense-details'>
                        <div className='expense-data-heading'>
                            <div className='heading-one'>Item</div>
                            <div className='heading-two'>Amount</div>
                        </div>

                        <ul className='expense-list'>

                            {expenses.length !== 0 ? (expenses.map((expense,index) => (
                            <li key={index}>
                                <div className='expense-item'>
                                    <div>{expense.name}</div>
                                    <div>{expense.amount}</div>
                                </div>
                            </li>
                            ))):
                                (
                                    <div>
                                        <img src="/images/artwork.png" alt="" />
                                    </div>
                                    )
                            }

                        </ul>
                    </div>

                    {
                        expenses.length === 0 ?null:(
                            <div className='pagination-container'><span>1</span> of 5 
                                <div><IoChevronBackCircleSharp className='dashboard-icon' /><IoChevronForwardCircleSharp className='dashboard-icon' /></div>
                            </div>
                        )
                    }

                </div>
            </div>
            <div className='dashboard-right'>

                <div className='top-info-card'>
                    
                    <div className='welcome-msg'>
                        <div>Welcome back, <span>{userProfile?.firstname}</span></div>
                        <div>Now, let’s get your expenses for this month</div>
                    </div>

                    <img className='dashboard-img' src="/images/user-profile-img.png" alt="profile" />
                </div>

                <div className='dashboard-form-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='form-field-one'>
                                <label htmlFor="#total-expense">Target Monthly Expenses</label>
                                <input type="text" id='total-expense' placeholder='monthly expense' />   
                            </div>

                            <div className='form-field-one'>
                                <label htmlFor="#expense-date">Date</label>
                                <input type="date" id='expense-date' />   
                            </div>

                            <div className='subheading'>Today’s Expenses</div>

                            <div className='form-collection-two'>

                                <input name='itemOneName' onChange={handleItemOneChange} className='form-field-two-a' type="text" id='item-one-a' placeholder='Enter Item' />

                                <input onBlur={handleBlur} name='itemOneAmount' onChange={handleItemOneChange} className='form-field-two-b' type="text" id='item-one-b' placeholder='enter Amount' />
                                
                            </div>

                            <div className='form-collection-two'>

                                <input name='itemTwoName' onChange={handleItemTwoChange} className='form-field-two-a' type="text" id='item-one-a' placeholder='Enter Item' />


                                <input onBlur={handleBlur} name='itemTwoAmount' onChange={handleItemTwoChange} className='form-field-two-b' type="text" id='item-one-b' placeholder='Enter Amount' />
                                
                            </div>

                            <div className='form-collection-two'>

                                <input name='itemThreeName' onChange={handleItemThreeChange} className='form-field-two-a' type="text" id='item-one-a' placeholder='Enter Item' />

                                <input onBlur={handleBlur} name='itemThreeAmount' onChange={handleItemThreeChange} className='form-field-two-b' type="text" id='item-one-b' placeholder='Enter Amount' />
                                
                            </div>

                            <div className='dashboard-total-wrapper'>
                                <div>Total Actual Expenses: </div>
                                <div><div>₦</div><span>{totalAmt}</span></div>
                            </div>

                            <button type='submit' className='dboard-save-btn'>SAVE TODAY’S EXPENSES</button>
                        </div>

                 
                    </form>

                </div>    
            </div>
        </div>    
    </div>
  )
}

export default Dashboard