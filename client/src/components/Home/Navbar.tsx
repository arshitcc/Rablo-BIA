import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

function Navbar() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold font-mono">
              Store
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 font-mono">
            {user ? (
              <>
                <span>Hello, {user.username}</span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
                <Link to="/products">
                  <Button variant="outline">Products</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth?tab=login">
                  <Button>Login</Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button>Signup</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setOpen(!open)} className="p-2 rounded-md">
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 font-mono">
          {user ? (
            <>
              <span className="block px-3 py-2">Hello, {user.username}</span>
              <button
                onClick={logout}
                className="block px-3 py-2 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth?tab=login" className="block px-3 py-2">
                Login
              </Link>
              <Link to="/auth?tab=signup" className="block px-3 py-2">
                Signup
              </Link>
            </>
          )}
          <Link to="/products" className="block px-3 py-2">
            Products
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
