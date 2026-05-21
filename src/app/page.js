import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import PopularSportsCategories from "@/components/PopularSportsCategories";
import WhyChooseBookNPlay from "@/components/WhyChooseBookNPlay";

export default function Home() {
  return (
    <div>
      <Banner />
      <PopularSportsCategories />
      <Featured />
      <WhyChooseBookNPlay />
    </div>
  );
}
