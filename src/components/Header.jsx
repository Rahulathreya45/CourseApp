import React from "react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Header = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <header className="bg-gray-900 dark:bg-gray-800 text-white py-4 px-8 flex items-center justify-between">
      <nav className="flex items-center space-x-4">
        {session && (
          <Link href="/account">
            <p
              className={`text-white ${
                router.pathname === "/account" ? "text-gray-400" : ""
              }`}
            >
              Account
            </p>
          </Link>
        )}
        <Link href="/courses">
          <p
            className={`text-white ${
              router.pathname === "/courses" ? "text-gray-400" : ""
            }`}
          >
            Courses
          </p>
        </Link>
        <Link href="/SavedCourses">
          <p
            className={`text-white ${
              router.pathname === "/SavedCourses" ? "text-gray-400" : ""
            }`}
          >
            Saved Courses
          </p>
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-white dark:text-gray-400"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => supabase.auth.signIn()}>
            <p
              className={`text-white ${
                router.pathname === "/auth/signin" ? "bg-gray-400" : ""
              }`}
            >
              Sign In
            </p>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
