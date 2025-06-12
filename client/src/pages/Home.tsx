import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Store</h1>
          <p className="mb-6">Manage your products easily.</p>
          <div className="space-x-4">
            <Link to="/auth?tab=signup">
              <Button className="cursor-pointer b px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">
                Signup
              </Button>
            </Link>
            <Link to="/auth?tab=login">
              <Button className="cursor-pointer b px-4 py-2 border border-blue-600 bg-white hover:bg-blue-50 text-blue-600 rounded">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
