import "./footer.css";
import { GiBrain } from "react-icons/gi";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <GiBrain className="logof" />
        <span>Made by</span>
        <a href="https://github.com/ClineLG" target="_blank">
          Céline
        </a>
      </div>
    </footer>
  );
};

export default Footer;
