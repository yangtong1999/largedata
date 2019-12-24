import React, {
	Component
} from 'react';
import style from "./index.css";
import {
	Carousel
} from 'antd';
class Carousels extends Component {
	render() {
		const imgList = [
			"http://img0.imgtn.bdimg.com/it/u=3197712270,171507528&fm=26&gp=0.jpg",
			"http://img3.imgtn.bdimg.com/it/u=1152002543,2741621944&fm=26&gp=0.jpg",
			"http://img0.imgtn.bdimg.com/it/u=1470360772,2304876950&fm=26&gp=0.jpg",
			"http://img4.imgtn.bdimg.com/it/u=4149676692,3092077076&fm=26&gp=0.jpg"
		]
		return (
			<div className  = {style.rightPlay}>
			<Carousel autoplay className = {style.Carousels}>
			  {
				imgList.map((item,index)=>{
					return(
                      <img className = {style.Img} src={item} key = {index} alt = ""></img>
					)
				})
			  }
			  </Carousel>
			</div>
		)
	}
}
export default Carousels;