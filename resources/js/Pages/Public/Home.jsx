import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/Home/HeroSection';
import CategoryGrid from '../../components/Home/CategoryGrid';
import HowItWorks from '../../components/Home/HowItWorks';
import ReportForm from '../../components/Home/ReportForm';
import StatusTracker from '../../components/Home/StatusTracker';
import PublicMap from '../../components/Home/PublicMap';
import StatsSection from '../../components/Home/StatsSection';
import LatestReports from '../../components/Home/LatestReports';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    document.getElementById('formulir-aduan')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header active="Beranda" />
      <main className="w-full pt-20 bg-background flex-1 max-w-7xl mx-auto px-margin-sm lg:px-margin">
        <div className="flex flex-col w-full">
          <HeroSection />
          <CategoryGrid onSelect={handleSelectCategory} />
          <HowItWorks />
          <ReportForm initialCategory={selectedCategory} />
          <StatusTracker />
          <PublicMap />
          <StatsSection />
          <LatestReports />
        </div>
      </main>
      <Footer />
    </>
  );
}
