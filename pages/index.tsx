import { getLayout } from "./components/layout";
import Image from "next/image";
import img from 'public/download.jpeg'; // Use correct path here
import FormExample from "./components/form";
import { Box } from "@mui/material";


export default function Home() {
  return (
    <>
      {/* <Image src={img} alt='image' /> */}
      <h2>Home Page</h2>
      {/* <Box sx={{width:'900px' , margin:'auto'}}><FormExample /></Box> */}
    </>
  );
}

Home.getLayout = getLayout;
