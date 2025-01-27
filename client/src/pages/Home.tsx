import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1>Content</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe ab
          consequatur quam?
        </p>
        <h3>Second title</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
          assumenda deleniti repellat fuga error sapiente nulla quia quibusdam
          inventore neque? Inventore similique dolorem dolor quod quisquam a
          distinctio impedit culpa ab corrupti?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
          repellendus ab aliquam ipsam. Reprehenderit esse ut, rem a dolorum
          molestias distinctio dicta vero saepe ratione quae, facilis nesciunt
          commodi aut corporis, non necessitatibus? Temporibus ad tempore iure,
          velit corrupti rem non suscipit eum ipsam quasi veritatis eligendi
          inventore.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
