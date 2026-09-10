import HeroSlider from "@/components/HeroSlider";
import AgentHighlights from "@/components/AgentHighlights";
import AICoWorker from "@/components/AICoWorker";
import BusinessTransformation from "@/components/BusinessTransformation";
import DemoSteps from "@/components/DemoSteps";
import AgentsInAction from "@/components/AgentsInAction";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSlider />
        <AgentHighlights />
        <AICoWorker />
        <BusinessTransformation />
        <DemoSteps />
        <AgentsInAction />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
