import { Header } from "@/components/Sections/Header";
import { StoryScroll } from "@/components/StoryScroll/StoryScroll";
import { Menu } from "@/components/Sections/Menu";
import { Gallery } from "@/components/Sections/Gallery";
import { Shop } from "@/components/Sections/Shop";
import { Policies } from "@/components/Sections/Policies";
import { Book } from "@/components/Sections/Book";
import { Footer } from "@/components/Sections/Footer";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main>
        <StoryScroll />
        <Menu />
        <Gallery />
        <Shop />
        <Policies />
        <Book />
      </main>
      <Footer />
    </div>
  );
}
