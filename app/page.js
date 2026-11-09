import About from "@/components/home/About";
import Featured from "@/components/home/featured";
import { Hero } from "@/components/home/Hero";


export default function Home() {
  return (
    <main>
      <Hero />
      <About/>
      <Featured/>
    </main>
  );
}
