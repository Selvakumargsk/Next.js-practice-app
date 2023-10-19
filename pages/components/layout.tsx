import { ReactElement } from "react"
import Footer from "./footer"
import Header from "./header"

const SiteLayout : React.FC<any> = ({ children })=>{
    return(
        <>
        <Header />
        <main>{children}</main>
        <Footer />
        </>
    )
};

export const getLayout = (page : ReactElement) =>{
   return <SiteLayout>{page}</SiteLayout>
}

export default SiteLayout;