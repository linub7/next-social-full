'use client';

import { SWRConfig } from 'swr';

import PrivatePagesFooter from '@/components/private/footer';
import PrivatePagesHeader from '@/components/private/header';
import PrivatePagesNavbar from '@/components/private/navbar';
import fetcher from '../utils/fetcher';

interface Props {
  children: React.ReactNode;
}

const PrivateLayout = (props: Props) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <div>
        <PrivatePagesHeader />
        <PrivatePagesNavbar />
        <main>{props.children}</main>
        <PrivatePagesFooter />
      </div>
    </SWRConfig>
  );
};

export default PrivateLayout;
