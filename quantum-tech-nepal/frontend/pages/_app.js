import '../styles/globals.css';
import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }) {
  // Allow individual pages to opt out of the default layout
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}
