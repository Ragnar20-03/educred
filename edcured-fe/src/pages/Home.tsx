import Records from "../components/Dashboard";
import { Hero } from "../components/Hero";
import { Nav } from "../components/Nav";

function Home() {
  return (
    <div className=" max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div>
        <Hero />
      </div>
      <div>
        <Records />
      </div>
    </div>
  );
}

export default Home;
