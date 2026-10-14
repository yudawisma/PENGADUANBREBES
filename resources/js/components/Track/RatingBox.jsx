import { useState } from 'react';
import Icon from '../common/Icon';

const notes = {
  0: 'Beri 1 klik untuk membantu peningkatan indeks kepuasan publik Brebes.',
  1: 'Terima kasih. Kami akan mendorong OPD terkait untuk meningkatkan pelayanan.',
  2: 'Terima kasih atas masukan Anda. Evaluasi akan diteruskan ke OPD.',
  3: 'Terima kasih. Penilaian Anda membantu kami terus memperbaiki layanan.',
  4: 'Terima kasih! Penilaian Anda sangat berarti bagi OPD pengampu.',
  5: 'Terima kasih banyak! Penilaian maksimal Anda sangat memotivasi petugas.',
};

export default function RatingBox({ ticketCode }) {
  const [rating, setRating] = useState(0);

  const handleRate = (n) => {
    setRating(n);
    // TODO: axios.post(`/api/tickets/${ticketCode}/rating`, { rating: n })
  };

  return (
    <div className="pt-6 mt-4 bg-surface-container-low p-6 rounded-2xl space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-headline-sm text-headline-sm text-primary">Evaluasi Kecepatan Tanggap</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Berikan rating terhadap transparansi dan penanganan petugas untuk laporan ini.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" aria-label={`${n} Bintang`} onClick={() => handleRate(n)} className="p-1 hover:scale-125 transition-transform cursor-pointer">
              <Icon name="star" filled={n <= rating} className={`text-[28px] ${n <= rating ? 'text-on-tertiary-container' : 'text-outline-variant'}`} />
            </button>
          ))}
        </div>
      </div>
      <p className="font-label-sm text-label-sm text-secondary font-medium">{notes[rating]}</p>
    </div>
  );
}
