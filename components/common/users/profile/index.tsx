import { IUser } from '@/types/user';

interface Props {
  user: IUser;
  href: string;
}

const UserProfile = (props: Props) => {
  const { user, href } = props;
  return <div>UserProfile</div>;
};

export default UserProfile;
