import Icon from '../common/Icon';

export default function Toast({ show }) {
  return (
    <div className={`fixed bottom-6 right-6 bg-primary text-on-primary px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 transform transition-all duration-300 z-50 ${show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
      <Icon name="check_circle" className="text-tertiary-fixed text-[22px]" />
      <div>
        <p className="font-label-md text-label-md font-bold">Disposisi Berhasil Dikirim!</p>
        <p className="font-body-sm text-body-sm text-surface-dim text-[12px]">SKPD terkait dan pelapor telah menerima update sistem.</p>
      </div>
    </div>
  );
}
