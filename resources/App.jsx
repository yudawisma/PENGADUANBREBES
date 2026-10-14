import Home from './Pages/Public/Home';
import TrackReport from './Pages/Public/TrackReport';

export default function App() {
  const path = window.location.pathname;
  if (path.startsWith('/cek-laporan')) return <TrackReport />;
  return <Home />;
}