'use client';

import useSWR from 'swr';
import UserProfile from '@/components/common/users/profile';

/**
 * swr only used in client components be careful
 */
interface Props {}

const PrivatePagesHeader = (props: Props) => {
  const { data, error, isLoading } = useSWR('/api/auth/me');

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <header className="flex flex-row w-full p-5 bg-slate-800 rounded-lg my-2 justify-between items-center">
      <div>
        <h1 className="font-mono text-lg">Social_App</h1>
      </div>
      <div>
        <UserProfile user={data?.data} href={'/account'} />
      </div>
    </header>
  );
};

export default PrivatePagesHeader;
