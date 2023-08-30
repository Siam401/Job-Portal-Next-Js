import ProgressBarComponent from './components/ProgressBarComponent';
import TabComponent from './components/TabComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TabComponent />
      <div className="sm:p-8 p-4">
        <ProgressBarComponent />
        {children}
      </div>
    </>
  );
}
