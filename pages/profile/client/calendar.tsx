import Layout from '../../../components/Layout';
import ClientLayout from '../../../components/ClientLayout';

interface CalendarProps {}

export default function Calendar({}: CalendarProps) {
  return (
    <Layout title={`Sillevon | Calendar`}>
      <ClientLayout>
        <div>
          <div>Calendar</div>
        </div>
      </ClientLayout>
    </Layout>
  );
}
