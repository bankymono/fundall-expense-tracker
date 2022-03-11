import React from 'react'
import Header from '../../components/Header/Header'
import IntroCenterContent from '../../components/IntroCenterContent/IntroCenterContent'
import './Intro.css'

const Intro = () => {
  return (
    <div className='card-container'>
        <Header />    
        <IntroCenterContent />
    </div>
  )
}

export default Intro