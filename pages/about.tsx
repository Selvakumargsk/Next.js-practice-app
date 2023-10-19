import Head from "next/head";
import { getSession } from 'next-auth/react';
import { getLayout } from "./components/layout";

const About: React.FC = ({ data }:any) => {

  return (
    <>
      <Head>
        <title>About page</title>
        <meta name="description" content="vefwkjvbwebvshd bbsdkvb" />
      </Head>
      <h1 className="text-center">About page</h1>
      {data ? <div className="container bg-blue-500">
        <div className="row ">
          <div className="col-sm-6 d-flex justify-content-center align-items-center text-[#fff]" style={{ height: '300px' }}>
            {data?.user?.name}
          </div>
          <div className="col-sm-6 d-flex justify-content-center align-items-center text-[#fff]" style={{ height: '300px' }}>
          {data?.user?.email}
          </div>
        </div>
      </div> : <div className="text-center font-semibold text-[#FF00FF]">Signin to see more content</div>}
    </>
  );
};

(About as any).getLayout = getLayout;

export default About;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if(!session){
    return {
      redirect : {
        destination : '/api/auth/signin?callbackurl=http://localhost:3001/about' ,
        permanent : false
      }
    }
  }
  return {
    props: {
      data: session,
    },
  };
}
