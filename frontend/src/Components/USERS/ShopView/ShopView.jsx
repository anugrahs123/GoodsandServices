import React from 'react'
import './ShopView.css'
import {Link} from "react-router-dom"

function ShopView({setres,i}) {
	return (
		<div className="shopview_body">
			<Link to="/productview">
			<div class="courses-container">
				<div class="course">
					<div class="course-preview">
						{/* <h6>Course</h6> */}
						<h2>{i.Category}</h2><br />
						<span>{ i.Location}</span>
					</div>
					<div class="course-info">
						
						<h6>1234567893</h6>
						<h2>{i.Name}</h2><br /><br /><br />
						<Link to="/productview"><button class="btttn">View Products</button></Link>
					</div>
				</div>
			</div>
				</Link>
			{/* card2 */}
		
			
		</div>
	)
}

export default ShopView