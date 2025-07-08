"use client";

import { getUser, logoutUser } from "@/services";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  function handleLogout() {
    try {
      logoutUser()
        .then((res) => res.json())
        .then((data) => {
          if (data.logout) {
            setUser(null);
            toast.success("Logged out successfully");
          } else {
            toast.error(data.message);
          }
        });
    } catch (err) {
      toast.error("Failed to logout");
    }
  }

  useEffect(() => {
    const authInfo = () => {
      try {
        getUser()
          .then((res) => res.json())
          .then((data) => {
            if (data.isAuthenticated) {
              setUser(data.user);
            } else {
              setUser(null);
            }
          }).catch(() => {
            setUser(null);
            toast.error("Failed to fetch user info");
          })
      } catch (err) {
        toast.error("Failed to fetch user info");
        setUser(null);
      }
    };

    authInfo();
  }, []);

  return (
    <header className={`flex w-full items-center bg-[#0a0a0a] text-gray-100`}>
      <div className="container max-w-6xl p-1 mx-auto space-y-6 sm:space-y-12">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link href="/" className="block w-full py-5">
              <img src="/logo.png" alt="logo" className="dark:hidden" />
              <img src="/logo.png" alt="logo" className="hidden dark:block" />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem href="/">Home</ListItem>
                  {/* <ListItem href="/write-blog">Write Blog</ListItem> */}
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span>Hello, {user.username}</span>
                  <Link href="/write-blog" className="text-base font-medium">
                    Write Blog
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 text-base font-medium cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <>
      <li>
        <Link
          href={href}
          className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </Link>
      </li>
    </>
  );
};
