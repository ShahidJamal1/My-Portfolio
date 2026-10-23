import TechStack from "./TechStack.jsx";
import Timeline from "./Timeline.jsx";
import BeyondCode from "./BeyondCode.jsx";

export default function SkillsExperience() {
  return (
    <section className="bg-gray-50/60 dark:bg-black py-24 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10 items-stretch">
        <div className="flex flex-col h-full"><TechStack /></div>
        <div className="flex flex-col h-full"><Timeline /></div>
        <div className="flex flex-col h-full"><BeyondCode /></div>
      </div>
    </section>
  );
}
