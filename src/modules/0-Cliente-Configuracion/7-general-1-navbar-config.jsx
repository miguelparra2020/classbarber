//Configuración del navbar
export const nameStoreLogo = "Mi Empresa"
export const inicioNavbar = "Inicio"
export const productosNavbar = "Productos"
export const mediaNavbar = "Publicaciones"
export const nosotrosNavbar = "Nosotros"
export const carritoNavbar = "Carrito"
export const usuarioNavbar = "Usuario"
//Configuración del navbar Links
export const linknameStoreLogo = "/1-Inicio"
export const linkinicioNavbar = "/1-Inicio"
export const linkproductosNavbar = "/2-Productos"
export const linkmediaNavbar = "/3-Media"
export const linknosotrosNavbar = "/4-Nosotros"
export const linkcarritoNavbar = "/5-Carrito"
export const linkusuarioNavbar = "/6-Usuario"
//Configuración del navbar Activos  
//Configuración del navbar Links
export const activenameStoreLogo = true //Default
export const activeinicioNavbar = true //Default
export const activeproductosNavbar = true
export const activemediaNavbar = true
export const activenosotrosNavbar = true
export const activecarritoNavbar = true
export const activeusuarioNavbar = true

// configuración de colores del navbar
export const colorNavbar = "bg-white-900"
export const colorNameStoreLogo = "text-blue-500"
export const colorLinkNavbar = "text-gray-600"
export const colorLinkNavbarHover = " hover:text-blue-400"

// configuración de colores del navbar movil
export const colorEntorno = "bg-gray-300"
export const colorCard = " bg-gray-800"
export const colorLinksCard= "text-gray-300"

//Seleccion de navbar unico estilo
import Navbar from "../7-General/1-navbars/1-navbar.jsx"
const NavbarSelect = () => {return <Navbar/>}
export default NavbarSelect


