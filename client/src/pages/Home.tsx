import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-600 dark:text-gray-200">
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default Home;
