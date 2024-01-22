import useSWR, { mutate } from 'swr';
import { notFound } from 'next/navigation';

import FollowButton from '@/components/common/buttons/follow';

interface Props {
  username: string;
}

const UsernamePageHeader = (props: Props) => {
  const { username } = props;
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(`/api/users?username=${username}`);

  const {
    data: followData,
    error: followError,
    isLoading: followIsLoading,
  } = useSWR(`/api/follows?user_id=${userData?.data[0]?.id}`);

  if (userData?.data?.length < 1) {
    notFound();
  }

  if (userError || followError) return <div>failed to load.</div>;
  if (userIsLoading || !userData || followIsLoading || !followData)
    return <div>Loading...</div>;

  const handleFollow = async () => {
    const res = await fetch(`/api/follows`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userData?.data[0]?.id }),
    });
    if (res.ok) {
      mutate(`/api/follows?user_id=${userData?.data[0]?.id}`);
    }
  };

  const handleUnFollow = async () => {
    const res = await fetch(`/api/follows/${userData?.data[0]?.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      mutate(`/api/follows?user_id=${userData?.data[0]?.id}`);
    }
  };
  return (
    <header className="w-full dark:bg-slate-800 bg-slate-300 p-2 rounded-lg flex flex-row items-center justify-between">
      <h1 className="text-lg font-bold">{username}</h1>
      {followData?.data?.length > 0 ? (
        <FollowButton label="UnFollow" onClick={handleUnFollow} />
      ) : (
        <FollowButton label="Follow" onClick={handleFollow} />
      )}
    </header>
  );
};

export default UsernamePageHeader;
