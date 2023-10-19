import { getLayout } from "./components/layout";
import Image from "next/image";
import img from 'public/download.jpeg'; // Use correct path here


export default function Home() {
  return (
    <>
      <Image src={img} alt='image' />
      <h2>Home Page</h2>
    </>
  );
}

Home.getLayout = getLayout;
