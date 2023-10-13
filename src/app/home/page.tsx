import HomeHeader from "@/components/header/homeHeader";
import UIArrow from "@/components/ui/arrow";
import UIButton from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-24">
      <HomeHeader />

      {/* Hero section */}
      <section className="flex flex-col px-vw gap-3">
        <h2 className="font-inter text-4xl text-black font-black">
          Make your URLs a bit short
        </h2>
        <p className="text-justify max-w-lg text-sm text-gray-500">
          BitShrt is a URL Shortner that acts a powerfull marketing tool that
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
          <UIButton variant="text" className="px-4">
            Guide
          </UIButton>
        </div>
      </section>

      {/* Admin Panel section */}
      <section className="pt-24">
        <div className="bg-slate-950 w-full relative px-vw">
          <div className="bg-gray-100 p-5 w-full rounded-t-lg h-48 absolute top-0 left-0 -translate-y-1/2"></div>
        </div>
      </section>
    </main>
  );
}
