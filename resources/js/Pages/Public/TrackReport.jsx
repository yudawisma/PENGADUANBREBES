import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import TrackHero from '../../components/Track/TrackHero';
import CaseFileCard from '../../components/Track/CaseFileCard';
import TrackSidebar from '../../components/Track/TrackSidebar';
import PublicFeed from '../../components/Track/PublicFeed';
import MapPreview from '../../components/Track/MapPreview';
import { sampleTickets, defaultTicketCode } from '../../data/tickets';

export default function TrackReport() {
  const [query, setQuery] = useState(defaultTicketCode);
  const [activeCode, setActiveCode] = useState(defaultTicketCode);
  const [error, setError] = useState('');

  const ticket = sampleTickets[activeCode];

  const scrollToCase = () =>
    setTimeout(() => document.getElementById('case-file-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

  const openTicket = (code) => {
    setQuery(code);
    setActiveCode(code);
    setError('');
    scrollToCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const code = (query.trim() || defaultTicketCode).toUpperCase();
    // TODO: ganti dengan request ke Laravel: axios.get(`/api/tickets/${code}`)
    if (sampleTickets[code]) {
      openTicket(code);
    } else {
      setError(`Tiket ${code} tidak ditemukan. Periksa kembali kode tiket Anda.`);
    }
  };

  return (
    <>
      <Header active="Cek Laporan" />
      <main className="w-full pt-20 bg-background flex-1 max-w-7xl mx-auto px-margin-sm lg:px-margin">
        <div className="flex flex-col w-full pb-space-xl">
          <TrackHero query={query} onQueryChange={setQuery} onSearch={handleSearch} onPick={openTicket} error={error} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <CaseFileCard ticket={ticket} />
            <TrackSidebar ticketCode={ticket.code} />
          </div>

          <PublicFeed onOpen={openTicket} />
          <MapPreview />
        </div>
      </main>
      <Footer />
    </>
  );
}
