import React from 'react'
import { Link } from 'react-router-dom'

import BaseLayout from '../components/layouts/BaseLayout.component'
import { Button } from '../components/UI'
import SavingsImage from '../images/savings.svg'

const Homepage = () => {
	return (
		<BaseLayout>
			<section className="w-full flex flex-col justify-center" style={{ minHeight: 500 }}>
				<div>
					<h3 className="text-center text-4xl md:text-6xl font-bold mb-2">Know your <span className="text-main">money.</span></h3>
					<h4 className="text-center text-xl md:text-3xl">Simple and effective expense manager.</h4>
					<div className="flex justify-center mt-8">
						<Link to="/auth/register">
							<Button className="mr-8">
								Sign Up
							</Button>
						</Link>
						<Link to="/auth/login">
							<Button type="default">
								Log In
							</Button>
						</Link>
					</div>
				</div>
			</section>
			<section className="p-8 w-full bg-secondary flex flex-col md:flex-row justify-evenly items-center" style={{ minHeight: 400 }}>
				<div className="bg-white rounded-full w-56 h-56 lg:w-64 lg:h-64 flex flex-col justify-center mb-8 md:mb-0">
					<i className="fas fa-money-bill-alt text-main fa-4x text-center"></i>
					<p className="text-center px-8 mt-4">Manage <span className="text-accent">recurrent</span> and <span className="text-accent">non-recurrent</span> payments</p>
				</div>
				<div className="bg-white rounded-full w-56 h-56 lg:w-64 lg:h-64 flex flex-col justify-center mb-8 md:mb-0">
					<i className="fas fa-envelope text-main fa-4x text-center"></i>
					<p className="text-center px-8 mt-4">Receive <span className="text-accent">reminders</span> for your bills</p>
				</div>
				<div className="bg-white rounded-full w-56 h-56 lg:w-64 lg:h-64 flex flex-col justify-center">
					<i className="fas fa-chart-bar text-main fa-4x text-center"></i>
					<p className="text-center px-8 mt-4">Easy to understand payment <span className="text-accent">statistics</span></p>
				</div>
			</section>
			<section className="w-full bg-white flex flex-col-reverse md:flex-row md:items-center py-8 px-16 xl:px-32">
				<div className="flex-1 md:p-16 lg-p-32 mb-8 md:mb-0">
					<h3 className="font-bold text-2xl text-center md:text-left"><span className="text-accent">No nonsense</span>, straight to the point</h3>
					<p className="xl:pr-32 mt-4 text-center md:text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates perferendis repellat minus doloremque ipsam temporibus. Reprehenderit aliquid enim, quidem, magnam molestiae omnis sed maxime voluptatum recusandae obcaecati, repellendus eos aut.</p>
				</div>
				<div className="flex-1">
					<img src={SavingsImage} alt="savings" className="p-8 md:p-0 xl:p-16" />
				</div>
			</section>
		</BaseLayout>
	)
}

export default Homepage