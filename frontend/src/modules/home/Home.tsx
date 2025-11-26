
import MainImage from "/public/images.jpg"
const Home = () => {
	return (
		<section>
			<div className="flex justify-between">
				<h1 className="text-white">Todo list!</h1>
				<img width={500} src={MainImage} alt='' />
			</div>
		</section>
	)
}

export default Home
