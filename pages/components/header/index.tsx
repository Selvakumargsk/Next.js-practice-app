import Link from 'next/link';
import { signIn, signOut, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function Header() {
  const [sessiondata, setData] = useState<any>(false);
  const [show, setShow] = useState(false);
  const Cart = useSelector((state: RootState) => state.cart.value);

  useEffect(() => {
    const securePage = async () => {
      const session: any = await getSession() ?? false;
      console.log(session);
      
      setData(session);
    }
    securePage();
  }, [])

  return (
    <>
      <header className="bg-red-700 py-4 px-2">
        <nav className="container mx-auto flex items-center justify-between">
          <Link className='text-decoration-none' href="/">
            <span className="text-white font-semibold text-lg">Home</span>
          </Link>
          <div className="space-x-4 flex items-center">
            <Link className='text-decoration-none' href="/about">
              <span className="text-white hover:underline">About</span>
            </Link>
            <Link className='text-decoration-none' href="/posts">
              <span className="text-white hover:underline">Posts</span>
            </Link>
            <Link className='text-decoration-none' href="/product">
              <span className="text-white hover:underline">Product</span>
            </Link>
            <Link className='text-decoration-none' href="/gallery">
              <span className="text-white hover:underline">Gallery</span>
            </Link>
            <Link className='text-decoration-none' href="/events">
              <span className="text-white hover:underline">Events</span>
            </Link>
            <Link className='text-decoration-none' href="/dashboard">
              <span className="text-white hover:underline">Dashboard</span>
            </Link>
            <Link className='text-decoration-none' href="/comments">
              <span className="text-white hover:underline">Comments</span>
            </Link>
            <Link className='text-decoration-none' href="/Cart">
              <div className="relative inline-block align-middle">
                <Image width="30" height="30" src="https://img.icons8.com/material-rounded/24/shopping-cart.png" alt="shopping-cart" />
                <span className="text-white absolute right-0 px-1 rounded-full bg-red-500" style={{ top: "-10px" }}>
                  {Cart?.length}
                </span>
              </div>
            </Link>
            {!sessiondata && <Link className='text-decoration-none' href="/api/auth/signin">
              <span className="text-white hover:underline" onClick={(e) => {
                e.preventDefault();
                signIn()
              }}>SignIn</span>
            </Link>}
            {sessiondata && (
              <div onClick={() => { setShow(!show); }}>
                <img
                  width={30}
                  height={30}
                  alt={sessiondata?.user.name}
                  src={sessiondata?.user.image}
                />
              </div>
            )}
          </div>
        </nav>
      </header>
      {sessiondata && show && (
        <div className="text-right ">
          {/* <div><span className="text-white bg-red-700 p-3 hover:underline">{sessiondata?.user?.name}</span></div> */}
          <Link className='text-decoration-none' href="/api/auth/signout">
            <span className="text-white bg-red-700 p-2 hover:underline" onClick={(e) => {
              e.preventDefault();
              signOut();
            }}>
              Sign Out
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
