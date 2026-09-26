import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sky from '@/components/kairo/Sky';
import Grain from '@/components/kairo/Grain';
import { ScrollProvider } from '@/components/kairo/ScrollProvider';
import Hero from '@/components/sections/Hero';

// Three.js ambient background canvas (loaded client-side without blocking critical render)
const Scene = dynamic(() => import('@/components/kairo/Scene'), {
  ssr: false,
});

// Below-the-fold sections loaded on demand
const TwoFaces = dynamic(() => import('@/components/sections/TwoFaces'));
const Passage = dynamic(() => import('@/components/sections/Passage'));
const Stay = dynamic(() => import('@/components/sections/Stay'));
const Capabilities = dynamic(() => import('@/components/sections/Capabilities'));
const Expedition = dynamic(() => import('@/components/sections/Expedition'));


export default function Home() {
  return (
    <ScrollProvider>
      {/* Fixed background stack */}
      <Sky />
      <Scene />
      <Grain />

      {/* Scrollable interface */}
      <div className="story">
        <Header />
        <main>
          <Hero />
          <TwoFaces />
          <Passage />
          <Stay />
          <Capabilities />
          <Expedition />
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
}
