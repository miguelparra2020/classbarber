// navbar que va a estar activo
export const acvtiveNavbar1 = true
export const acvtiveNavbar2 = false
export const acvtiveNavbar3 = false
export const acvtiveNavbar4 = false
export const acvtiveNavbar5 = false
export const acvtiveNavbar6 = false
export const acvtiveNavbar7 = false
export const acvtiveNavbar8 = false
export const acvtiveNavbar9 = false
export const acvtiveNavbar10 = false


// Seleccion de navbar unico estilo
import Navbar1 from "../../../modules/7-General/1-navbars/1-navbar.jsx"
import Navbar2 from "../../../modules/7-General/1-navbars/2-navbar.jsx"
import Navbar3 from "../../../modules/7-General/1-navbars/3-navbar.jsx"
import Navbar4 from "../../../modules/7-General/1-navbars/4-navbar.jsx"
import Navbar5 from "../../../modules/7-General/1-navbars/5-navbar.jsx"
import Navbar6 from "../../../modules/7-General/1-navbars/6-navbar.jsx"
import Navbar7 from "../../../modules/7-General/1-navbars/7-navbar.jsx"
import Navbar8 from "../../../modules/7-General/1-navbars/8-navbar.jsx"
import Navbar9 from "../../../modules/7-General/1-navbars/9-navbar.jsx"
import Navbar10 from "../../../modules/7-General/1-navbars/10-navbar.jsx"
const NavbarSelect = () => {return (<> 
{acvtiveNavbar1 && <Navbar1/>}
{acvtiveNavbar2 && <Navbar2/>}
{acvtiveNavbar3 && <Navbar3/>}
{acvtiveNavbar4 && <Navbar4/>}
{acvtiveNavbar5 && <Navbar5/>}
{acvtiveNavbar6 && <Navbar6/>}
{acvtiveNavbar7 && <Navbar7/>}
{acvtiveNavbar8 && <Navbar8/>}
{acvtiveNavbar9 && <Navbar9/>}
{acvtiveNavbar10 && <Navbar10/>}
</>)}
export default NavbarSelect
