import React from "react"
import Style from './App.css'

export default class App extends React.Component {

	render() {
		const styles = {
			margin: '25px',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
		}

		return (
			<div style={styles}>
				<div>
					<nav className="nav">
						<ul className="list">
							<li className="item"><a className="link" href="https://pranjalgore.com/">Home</a></li>
							<li className="item"><a className="link" href="https://pranjalgore.com/blog">Blog</a></li>
							<li className="item"> <a className="link" href="https://pranjalgore.com/projects">Projects</a> </li>
							<li className="item"> <a className="link" href="https://pranjalgore.com/assets/Pranjal Gore Resume v2.5.pdf">Résumé</a> </li>
						</ul>
					</nav>
				</div>
				<img style={{ width: "25%", display: 'inline' }}
	          src="https://raw.githubusercontent.com/jalispran/jalispran.github.io/master/assets/images/profile.png"
	          alt="Pranjal Gore"
	        />
				<p style={{marginBottom:'10px', marginTop: '32px'}}>In times of lockdown, here comes the most addictive game of the season</p>
        <h3>The Covid Fighter</h3>
			</div>
		);
	}
}
