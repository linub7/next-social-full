'use client';

import useSWR from 'swr';

import ProfilePageCreateForm from '@/components/private/profile/form';
import PostsContainer from '@/components/common/posts/container';

interface Props {}

const ProfilePage = (props: Props) => {
  const { isLoading, data, error } = useSWR('/api/auth/me');
  if (error) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <main>
      <ProfilePageCreateForm />
      <br />
      <PostsContainer
        username={data?.data?.username}
        isEditButtonVisible={true}
      />
    </main>
  );
};

export default ProfilePage;
