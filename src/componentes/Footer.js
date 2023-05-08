import "./styles/footer.css"
import iconoInstagram from "./iconos/instagram.png";
import iconoTwitter from "./iconos/gorjeo.png";
import iconoLinkedin from "./iconos/linkedin.png";

const  Footer = () => {


    return(
        <div id="footer" className="d-flex align-items-center justify-content-center">
            <div className="w-75 row text-white mt-4">
                <div className="col">
                    <h2>Contáctanos</h2>
                    <p>Sobre nosotros</p>
                    <p>Donde estamos</p>
                </div>
                <div className="col">
                    <h2>Síguenos</h2>
                    <div>
                       <img src={iconoInstagram} className="iconoInstagram" alt="Instagram"/>
                       <img src={iconoTwitter} className="iconoTwitter ms-2 me-3" alt="Twitter"/> 
                       <img src={iconoLinkedin} className="iconoLinkedin" alt="Linkedin"/> 
                    </div>
                </div>
                <div className="col">
                    <h2>Métodos de pago</h2>
                    <p>Paypal</p>
                    <p>Bizum</p>
                    <p>Visa</p>
                    <p>Paysafecard</p>                
                </div>
                <div className="col">
                    <h2>Términos legales</h2>
                    <p>Uso de datos personales</p>
                    <p>Cookies</p>
                </div>
            </div>
        </div>
    )
        
    
}

export default Footer;