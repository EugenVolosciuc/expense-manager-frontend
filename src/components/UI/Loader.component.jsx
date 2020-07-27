import React from 'react'

const Loader = ({size = '', className = ''}) => <i className={`fas fa-circle-notch fa-spin ${size} ${className} text-accent`}></i>

export default Loader