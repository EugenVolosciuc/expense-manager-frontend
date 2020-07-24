import React from 'react'

const Loader = ({size = ''}) => <i className={`fas fa-circle-notch fa-spin ${size} text-accent`}></i>

export default Loader