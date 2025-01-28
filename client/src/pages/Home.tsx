import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default Home;
