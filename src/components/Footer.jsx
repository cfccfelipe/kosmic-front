const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className='footer mt-auto fixed-bottom py-3'>
			<div className='container'>
				<p className='text-center rounded-3 border-top text-muted'>
					© {year} Kosmic
				</p>
			</div>
		</footer>
	);
};

export default Footer;
