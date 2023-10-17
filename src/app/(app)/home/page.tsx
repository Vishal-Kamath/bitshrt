import UIArrow from "@/components/ui/arrow";
import UIButton from "@/components/ui/button";
import HomeHeader from "../components/header/homeHeader";

export default function Home() {
  return (
    <main className="flex flex-col gap-24">
      <HomeHeader />

      {/* Hero section */}
      <section className="flex flex-col px-vw gap-3 max-sm:items-center">
        <h2 className="font-inter text-2xl max-sm:text-center font-semibold sm:text-5xl text-black">
          Make your URLs a bit short
        </h2>
        <p className="text-justify max-sm:text-center max-w-lg text-xs sm:text-sm text-gray-500">
          BitShrt is a URL Shortner that acts as a powerfull marketing tool that
          helps you track your customer details such as location, language, user
          device and a lot more.
        </p>
        <div className="flex gap-3 text-sm mt-6">
          <UIButton
            variant="outlined"
            className="rounded-full flex gap-3 items-center group"
          >
            <span>Get Started</span>
            <UIArrow className="text-gray-600 group-hover:text-black" />
          </UIButton>
          <UIButton variant="text" className="px-6">
            Guide
          </UIButton>
        </div>
      </section>

      {/* Admin Panel section */}
      <section className="pt-24">
        <div className="bg-slate-950 w-full min-h-[20rem] relative px-vw"></div>
      </section>
    </main>
  );
}
