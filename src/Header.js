import React from 'react'

const Header = ({title}) => {


  return (
    <header >
        <h1>{title} list</h1>
    </header>
  )
}

Header.defaultProps = {title: "Default Title"}

export default Header