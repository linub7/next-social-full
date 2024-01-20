import useSWR from 'swr';

import UserProfile from '@/components/common/users/profile';
import { IUser } from '@/types/user';

interface Props {
  index: number;
}

const FollowersList = (props: Props) => {
  const { data: meData } = useSWR(`/api/auth/me`);
  const {
    data: followingData,
    error,
    isLoading,
  } = useSWR(`/api/users/${meData?.data?.id}/followers?page=${props?.index}`);
  if (error) return <div>failed to load.</div>;
  if (isLoading || !followingData) return <div>Loading...</div>;
  return (
    <ul>
      {followingData?.data?.map((follower: IUser) => (
        <li key={follower?.id} className="my-5">
          <UserProfile user={follower} />
        </li>
      ))}
    </ul>
  );
};

export default FollowersList;
