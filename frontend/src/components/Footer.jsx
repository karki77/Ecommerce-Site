import {Container} from "react-bootstrap"

function Footer(){
  return (
    <footer>
        <Container>
        <p className=" text-center">Broadway &copy; {new Date().getFullYear()}</p>
        </Container>
    </footer>
  );
}

export default Footer;