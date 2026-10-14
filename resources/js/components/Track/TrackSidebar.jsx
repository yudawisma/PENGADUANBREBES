import { useState } from 'react';
import Icon from '../common/Icon';

function WhatsAppCard({ ticketCode }) {
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: axios.post('/api/notifications/whatsapp', { ticket: ticketCode, phone: `62${phone}` })
    setMsg(`Notifikasi untuk tiket ${ticketCode} akan dikirim ke +62${phone.replace(/^0/, '')}.`);
    setPhone('');
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm relative overflow-hidden">
      <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-4">
        <Icon name="chat" className="text-[26px]" />
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Langganan Notifikasi WhatsApp</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 mb-4 leading-relaxed">
        Dapatkan pembaruan langsung ke WhatsApp Anda saat laporan ini dinyatakan rampung atau saat foto akhir diunggah.
      </p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label-md text-label-md text-outline">+62</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="812 3456 7890"
            className="w-full h-12 pl-12 pr-4 bg-surface-container-low rounded-xl font-body-sm text-body-sm text-primary placeholder:text-outline-variant outline-none focus:bg-surface-container"
          />
        </div>
        <button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-2">
          <Icon name="notifications_active" className="text-[20px]" />
          <span>Kirim Notifikasi ke WA</span>
        </button>
      </form>
      {msg && <p className="mt-3 p-3 rounded-lg bg-surface-container-high text-primary font-body-sm text-body-sm">{msg}</p>}
      <p className="font-label-sm text-label-sm text-outline mt-3 flex items-center gap-1.5">
        <Icon name="lock" className="text-[16px]" />
        Nomor ponsel Anda aman &amp; tidak disebarluaskan.
      </p>
    </div>
  );
}

const reasons = [
  { icon: 'verified_user', title: 'Privasi Terjaga:', text: 'Tidak ada risiko kebocoran kata sandi pribadi warga.' },
  { icon: 'speed', title: 'Kemudahan Akses:', text: 'Cukup simpan kode tiket pengaduan untuk cek progres kapan saja.' },
  { icon: 'public', title: 'Kontrol Publik:', text: 'Masyarakat luas dapat turut memantau apakah dinas terkait menepati janji perbaikan.' },
];

function NoLoginInfo() {
  return (
    <div className="bg-surface-container p-6 rounded-3xl shadow-sm space-y-3">
      <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
        <Icon name="fingerprint" className="text-[22px]" />
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Mengapa Tanpa Login &amp; Password?</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Sistem <strong className="text-on-surface">tiket unik terenkripsi</strong> Lapor Brebes sengaja dirancang tanpa
        kewajiban mendaftar akun. Pendekatan ini memastikan:
      </p>
      <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
        {reasons.map((r) => (
          <li key={r.icon} className="flex items-start gap-2.5">
            <Icon name={r.icon} className="text-secondary text-[20px] shrink-0 mt-0.5" />
            <span><strong>{r.title}</strong> {r.text}</span>
          </li>
        ))}
      </ul>
      <div className="pt-2">
        <div className="p-3 rounded-xl bg-surface-container-lowest text-primary font-label-sm text-label-sm flex items-center justify-between">
          <span>Standar Keamanan Siber:</span>
          <span className="font-bold text-secondary">ISO 27001 BSSN RI</span>
        </div>
      </div>
    </div>
  );
}

function SlaCard() {
  const path = 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';
  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-headline-sm text-headline-sm text-primary">Standar SLA Brebes</h4>
        <span className="px-2.5 py-1 rounded-full bg-surface-container text-outline font-label-sm text-label-sm">Bulan Ini</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
            <path className="text-surface-container-high" d={path} fill="none" stroke="currentColor" strokeWidth={4} />
            <path className="text-secondary" d={path} fill="none" stroke="currentColor" strokeDasharray="91, 100" strokeLinecap="round" strokeWidth={4} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-headline-sm text-headline-sm text-primary font-bold leading-none">91%</span>
          </div>
        </div>
        <div>
          <p className="font-label-md text-label-md text-primary font-semibold">Tepat Waktu (&lt; 72 Jam)</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Rata-rata respon pertama verifikasi dinas di Kabupaten Brebes adalah 14 jam kerja.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center pt-2">
        <div className="p-3 rounded-xl bg-surface-container-low">
          <div className="font-headline-sm text-headline-sm text-primary font-bold">1.482</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">Aduan Tuntas 2025</div>
        </div>
        <div className="p-3 rounded-xl bg-surface-container-low">
          <div className="font-headline-sm text-headline-sm text-tertiary-container font-bold">4.8 / 5</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">Kepuasan Warga</div>
        </div>
      </div>
    </div>
  );
}

export default function TrackSidebar({ ticketCode }) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-space-md">
      <WhatsAppCard key={ticketCode} ticketCode={ticketCode} />
      <NoLoginInfo />
      <SlaCard />
    </div>
  );
}
