import React from 'react'

const Square = ({colorValue , hexValue ,isDarkText}) => {
  return (
    <section 
    className='square'
    style = {{
      background:colorValue, 
      color: isDarkText?'#000':"#fff",
      width: "100%",
       textAlign: 'center'}}
    >
        <p>{colorValue ? colorValue: "Empty"}</p>
        <p>{hexValue ? hexValue: null}</p>
        </section>
  )
}

Square.defaultProp = {
  colorValue : "Empty value"
}
export default Square