import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import TrackHero from '../../components/Track/TrackHero';
import CaseFileCard from '../../components/Track/CaseFileCard';
import TrackSidebar from '../../components/Track/TrackSidebar';
import PublicFeed from '../../components/Track/PublicFeed';
import MapPreview from '../../components/Track/MapPreview';

export default function TrackReport() {
  const [query, setQuery] = useState('');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');

  const scrollToCase = () =>
    setTimeout(() => document.getElementById('case-file-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

  const openTicket = async (code) => {
    const normalizedCode = code.trim().toUpperCase();
    setQuery(normalizedCode);
    setError('');

    try {
      const { data } = await axios.get(`/api/tickets/${encodeURIComponent(normalizedCode)}`);
      const report = data.ticket;
      const step = ({ menunggu: 1, ditelaah: 1, butuh_bukti: 1, valid: 2, diteruskan: 2, dikerjakan: 3, selesai: 4, ditolak: 1, duplikasi: 1 })[report.status] ?? 1;
      const tone = report.status === 'selesai' ? 'green' : step >= 3 ? 'amber' : 'indigo';

      setTicket({
        code: report.code,
        category: report.category,
        location: [report.location, report.village, `Kec. ${report.district}`].filter(Boolean).join(', '),
        submittedAt: new Date(report.reported_at).toLocaleString('id-ID'),
        reporter: 'Identitas pelapor dilindungi',
        statusLabel: report.status.replaceAll('_', ' ').toUpperCase(),
        tone,
        step,
        agency: report.department || 'Menunggu penugasan OPD',
        description: report.description,
        evidence: report.attachments.map((attachment, index) => ({
          tag: index === 0 ? 'Kondisi Awal (Pelapor)' : `Lampiran ${index + 1}`,
          tagClass: 'bg-error text-on-error',
          date: new Date(report.reported_at).toLocaleDateString('id-ID'),
          caption: attachment.name,
          image: attachment.url,
        })),
        timeline: report.timeline.map((event) => ({
          actor: event.status.replaceAll('_', ' '),
          time: new Date(event.time).toLocaleString('id-ID'),
          text: event.message || 'Status laporan diperbarui.',
        })),
      });
      scrollToCase();
    } catch (requestError) {
      setTicket(null);
      setError(requestError.response?.status === 404
        ? `Tiket ${normalizedCode} tidak ditemukan. Periksa kembali kode tiket Anda.`
        : 'Data tiket belum dapat dimuat. Periksa koneksi lalu coba kembali.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    openTicket(query);
  };

  return (
    <>
      <Header active="Cek Laporan" />
      <main className="w-full pt-20 bg-background flex-1 max-w-7xl mx-auto px-margin-sm lg:px-margin">
        <div className="flex flex-col w-full pb-space-xl">
          <TrackHero query={query} onQueryChange={setQuery} onSearch={handleSearch} onPick={openTicket} error={error} />

          {ticket && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                <CaseFileCard ticket={ticket} />
                <TrackSidebar ticketCode={ticket.code} />
              </div>
              <PublicFeed onOpen={openTicket} />
              <MapPreview />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
