import { Suspense, lazy, useState } from "react";
import { Layout } from "./components/Layout";

const HeroSection = lazy(() => import("./sections/HeroSection"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const CategoriesSection = lazy(() => import("./sections/CategoriesSection"));
const GallerySection = lazy(() => import("./sections/GallerySection"));
const TimelineSection = lazy(() => import("./sections/TimelineSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

function SectionFallback() {
  return (
    <div className="w-full h-32 flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{
          borderColor: "rgba(124,58,237,0.5)",
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
}

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  return (
    <Layout>
      <Suspense fallback={<SectionFallback />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CategoriesSection onCategorySelect={setActiveCategoryId} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <GallerySection
          categoryId={activeCategoryId}
          onClose={() => setActiveCategoryId(null)}
        />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TimelineSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </Layout>
  );
}
