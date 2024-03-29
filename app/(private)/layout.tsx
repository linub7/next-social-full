'use client';

import { SWRConfig } from 'swr';

import PrivatePagesFooter from '@/components/private/footer';
import PrivatePagesHeader from '@/components/private/header';
import PrivatePagesNavbar from '@/components/private/navbar';
import fetcher from '../utils/fetcher';
import SearchBar from '@/components/private/search-bar';

interface Props {
  children: React.ReactNode;
}

const PrivateLayout = (props: Props) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center">
        <SearchBar />
        <PrivatePagesHeader />
        <PrivatePagesNavbar />
        <main className="w-full p-5 dark:bg-slate-800 bg-slate-300 rounded-lg my-2">
          {props.children}
        </main>
        <PrivatePagesFooter />
      </div>
    </SWRConfig>
  );
};

export default PrivateLayout;
