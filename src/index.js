import React from 'react'
import ReactDOM from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

import App from './App'

import 'react-calendar/dist/Calendar.css'
import './styles/tailwind.output.css'
import './styles/tailwind.css'
import './styles/style.css'
import './styles/hamburger.css'

const AlertTemplate = ({ style, options, message, close }) => (
	<div className="p-4 bg-gray-200 rounded mt-4 border-2">
		{options.type === 'info' && <i aria-hidden className="fas fa-exclamation fa-lg mr-2 text-yellow-400"></i>}
		{options.type === 'success' && <i aria-hidden className="fas fa-check fa-lg mr-2 text-green-400"></i>}
		{options.type === 'error' && <i aria-hidden className="fas fa-times fa-lg mr-2 text-red-400"></i>}
		{message}
	</div>
)

ReactDOM.render(
	<AlertProvider template={AlertTemplate} timeout={3000}>
		<App />
	</AlertProvider>,
	document.getElementById('root')
)