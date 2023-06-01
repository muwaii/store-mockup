import Typography from "antd/es/typography/Typography";
import "./styles/Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms and Conditions
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        +69 348 5067
      </Typography.Link>
    </div>
  );
}

export default Footer;
