import Link from 'next/link';
import { signIn, signOut, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function Header() {
  const [sessiondata, setData] = useState(false);
  const Cart = useSelector((state: RootState) => state.cart.value);
  console.log(Cart.length);

  useEffect(() => {
    const securePage = async () => {
      const session: any = await getSession() ?? false;
      setData(session);
    }
    securePage();
  }, [])

  return (
    <header className="bg-red-700 py-4 px-2">
      <nav className="container mx-auto flex items-center justify-between">
        <Link className='text-decoration-none' href="/">
          <span className="text-white font-semibold text-lg">Home</span>
        </Link>
        <div className="space-x-4">
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
              <img width="30" height="30" src="https://img.icons8.com/material-rounded/24/shopping-cart.png" alt="shopping-cart" />
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
          {sessiondata && <Link className='text-decoration-none' href="/api/auth/signout">
            <span className="text-white hover:underline" onClick={(e) => {
              e.preventDefault();
              signOut()
            }}>Sign Out</span>
          </Link>}
        </div>
      </nav>
    </header>
  );
}
