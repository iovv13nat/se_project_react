import "./Footer.css";

function Footer({ author, year }) {
  return (
    <footer className="footer">
      <p className="footer__author">{author}</p>
      <p className="footer__year">{year}</p>
    </footer>
  );
}

export default Footer;
