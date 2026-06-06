
function About_History() {
	return (
		<>
			<section className="time-line gray-bg">
				<div className="container">
					<div className="sec-title">
						<div className="row">
							<div className="col-md-4">
								<h3>Company <span>history</span> at a glance</h3>
							</div>
							<div className="col-md-8">
								<p>Founded to help industries unlock value from surplus inventory, Surplus And Prime Worldwide connects global buyers and sellers of industrial equipment across energy, manufacturing, and heavy industries.</p>
							</div>
						</div>
					</div>
					<form className="timeline-tab-select-form">
						<select className="selectpicker" id="timeline-tab-select">
							<option value="year-start">Start</option>
							<option value="year-1970">1970</option>
							<option value="year-1980">1980</option>
							<option value="year-1990">1990</option>
							<option value="year-2000">2000</option>
							<option value="year-2010">2010</option>
						</select>
					</form>
					<div className="tab-title-wrapper text-center">
						<ul className="tab-title" id="timeline-tab">
							<li className="active" data-tab-name="year-start"><a aria-controls="year-start" data-toggle="tab" href="#year-start">Start</a></li>
							<li data-tab-name="year-1970"><a aria-controls="year-1970" data-toggle="tab" href="#year-1970">1970</a></li>
							<li data-tab-name="year-1980"><a aria-controls="year-1980" data-toggle="tab" href="#year-1980">1980</a></li>
							<li data-tab-name="year-1990"><a aria-controls="year-1990" data-toggle="tab" href="#year-1990">1990</a></li>
							<li data-tab-name="year-2000"><a aria-controls="year-2000" data-toggle="tab" href="#year-2000">2000</a></li>
							<li data-tab-name="year-2010"><a aria-controls="year-2010" data-toggle="tab" href="#year-2010">2010</a></li>
						</ul>
					</div>
					<div className="tab-content">
						<div className="tab-pane fade in active" id="year-start">
							<div className="row">
								<div className="col-md-6">
									<img src="images/time-line.jpg" alt="Awesome Image" />
								</div>
								<div className="col-md-6">
									<div className="content">
										<h3>The Story Behind Surplus And Prime Worldwide</h3>
										<p>Surplus And Prime Worldwide was founded with a vision to simplify surplus trading. Over the years, we have grown into a trusted global partner, connecting industries with reliable surplus equipment and helping businesses recover value while reducing material costs.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade in " id="year-1970">
							<div className="row">
								<div className="col-md-6">
									<img src="images/time-line.jpg" alt="Awesome Image" />
								</div>
								<div className="col-md-6">
									<div className="content">
										<h3>Signing contract with major investor</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor in reprehenderit in voluptate velit</p>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade in " id="year-1980">
							<div className="row">
								<div className="col-md-6">
									<img src="images/time-line.jpg" alt="Awesome Image" />
								</div>
								<div className="col-md-6">
									<div className="content">
										<h3>Signing contract with major investor</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor in reprehenderit in voluptate velit</p>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade in " id="year-1990">
							<div className="row">
								<div className="col-md-6">
									<img src="images/time-line.jpg" alt="Awesome Image" />
								</div>
								<div className="col-md-6">
									<div className="content">
										<h3>Signing contract with major investor</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor in reprehenderit in voluptate velit</p>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade in " id="year-2000">
							<div className="row">
								<div className="col-md-6">
									<img src="images/time-line.jpg" alt="Awesome Image" />
								</div>
								<div className="col-md-6">
									<div className="content">
										<h3>Signing contract with major investor</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor in reprehenderit in voluptate velit</p>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade in " id="year-2010">
							<div className="row">
								<div className="col-md-6">
									<img src="images/time-line.jpg" alt="Awesome Image" />
								</div>
								<div className="col-md-6">
									<div className="content">
										<h3>Signing contract with major investor</h3>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor in reprehenderit in voluptate velit</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default About_History;