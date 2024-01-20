import Link from 'next/link';
import Image from 'next/image';

import { IUser } from '@/types/user';

interface Props {
  user: IUser;
  href?: string;
}

const UserProfile = (props: Props) => {
  const { user, href } = props;
  return (
    <div>
      <Link
        href={`/${href || user?.username}`}
        className="flex flex-row items-center"
      >
        <div>
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              alt={user?.username}
              height={50}
              width={50}
              className="rounded-full mr-3"
            />
          ) : (
            <div className="bg-slate-600 w-12 h-12 rounded-full mr-3"></div>
          )}
        </div>
        <div>{user?.username}</div>
      </Link>
    </div>
  );
};

export default UserProfile;
