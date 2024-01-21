'use client';

import PostsContainer from '@/components/common/posts/container';
import UsernamePageHeader from '@/components/private/username/header';

interface Props {
  params: {
    username: string;
  };
}

const UsernamePage = (props: Props) => {
  const {
    params: { username },
  } = props;

  return (
    <div>
      <UsernamePageHeader username={username} />
      <PostsContainer username={username} />
    </div>
  );
};

export default UsernamePage;
