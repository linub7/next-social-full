import useSWR from 'swr';

import UserProfile from '@/components/common/users/profile';
import { IUser } from '@/types/user';

interface Props {
  index: number;
}

const FollowingList = (props: Props) => {
  const { data: meData } = useSWR(`/api/auth/me`);
  const {
    data: followerData,
    error,
    isLoading,
  } = useSWR(`/api/users/${meData?.data?.id}/following?page=${props?.index}`);
  if (error) return <div>failed to load.</div>;
  if (isLoading || !followerData) return <div>Loading...</div>;
  return (
    <ul>
      {followerData?.data?.map((follower: IUser) => (
        <li key={follower?.id} className="my-5">
          <UserProfile user={follower} />
        </li>
      ))}
    </ul>
  );
};

export default FollowingList;
