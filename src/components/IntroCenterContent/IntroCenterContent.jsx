import React from 'react'
import './IntroCenterContent.css'

const IntroCenterContent = () => {
  return (
    <div className='intro-center-content'>
        <img  className='intro-img' src="/images/intro_img.png" alt="" />

        <div className='intro-text-container'>
            <div className='text-one'>Fundall Expense Tracker</div>
            <div className='text-two'>Mini Project Frontend</div>
        </div>

        <div className='author'>
            <span>by</span>
            <span className='name'>Babatunde Fashola</span>
        </div>
    </div>
  )
}

export default IntroCenterContent