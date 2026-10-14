import { useState, useEffect } from 'react';
import Icon from '../common/Icon';
import StepperIndicator from '../Report/StepperIndicator';
import Step1Info from '../Report/Step1Info';
import Step2Location from '../Report/Step2Location';
import Step3Evidence from '../Report/Step3Evidence';
import Step4Confirm from '../Report/Step4Confirm';

const emptyForm = {
  category: '', title: '', description: '',
  kecamatan: '', desa: '', alamat: '', lat: null, lng: null,
  files: [], name: '', phone: '', agree: false,
};

export default function ReportForm({ initialCategory = '' }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [ticket, setTicket] = useState(null);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // Kategori dari kartu di CategoryGrid otomatis terisi ke form
  useEffect(() => {
    if (initialCategory) {
      setForm((f) => ({ ...f, category: initialCategory }));
      setStep(1);
    }
  }, [initialCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: kirim ke Laravel, contoh:
    // const data = new FormData();
    // Object.entries(form).forEach(([k, v]) => k !== 'files' && data.append(k, v ?? ''));
    // form.files.forEach((f) => data.append('files[]', f));
    // const res = await axios.post('/api/reports', data);  -> pakai res.data.ticket
    const fakeTicket = `BRB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`;
    setTicket(fakeTicket);
    setForm(emptyForm);
    setStep(1);
  };

  return (
    <section id="formulir-aduan" className="w-full bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-3xl shadow-sm mb-space-xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-tertiary-container font-bold uppercase tracking-wider">Layanan Mandiri Warga</span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Formulir Pengaduan Cepat</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Isi laporan dengan teliti agar dapat segera divalidasi oleh dinas teknis Pemkab Brebes.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center gap-2 self-start sm:self-auto">
            <Icon name="security" className="text-secondary text-[18px]" />
            Data identitas Anda dijamin kerahasiaannya
          </div>
        </div>

        <StepperIndicator step={step} onChange={setStep} />

        <form onSubmit={handleSubmit}>
          {step === 1 && <Step1Info form={form} update={update} onNext={() => setStep(2)} />}
          {step === 2 && <Step2Location form={form} update={update} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <Step3Evidence form={form} update={update} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
          {step === 4 && <Step4Confirm form={form} update={update} onBack={() => setStep(3)} />}
        </form>

        {ticket && (
          <div className="mt-space-md p-space-md rounded-2xl bg-surface-container border-2 border-secondary/30 text-on-surface">
            <div className="flex items-start gap-space-sm">
              <Icon name="check_circle" className="text-[28px] text-secondary" />
              <div className="flex-1">
                <h4 className="font-headline-sm text-[18px] text-primary font-bold">Laporan Anda Berhasil Dikirimkan!</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Nomor Registrasi Laporan Anda adalah:{' '}
                  <strong className="text-tertiary-container font-mono text-[16px]">{ticket}</strong>. Simpan kode ini untuk
                  mengecek progres penyelesaian di bagian 'Cek Status Laporan'.
                </p>
                <div className="mt-space-sm flex gap-space-sm">
                  <a href="#cek-status" className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm">Pantau Tiket Sekarang</a>
                  <button type="button" onClick={() => setTicket(null)} className="px-3 py-1.5 rounded-lg bg-surface-container-low text-primary font-label-sm text-label-sm">
                    Tutup Notifikasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
