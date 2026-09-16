import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SkillsCloud from '@/components/sections/SkillsCloud';
import ProjectsShowcase from '@/components/sections/ProjectsShowcase';
import Timeline from '@/components/sections/Timeline';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-ink">
      <Header />
      <Hero />
      <SkillsCloud />
      <ProjectsShowcase />
      <Timeline />
      <ContactForm />
      <Footer />
    </main>
  );
}