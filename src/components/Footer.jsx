import logoSrc from "../media/LogoKosmic.png";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="pie-de-pagina flexcenter" >
			© {year} Kosmic
            <img alt="logo-kosmic" src={logoSrc} />
		</footer>
	);
};

export default Footer;
