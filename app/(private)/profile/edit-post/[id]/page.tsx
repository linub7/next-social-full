'use client';

import useSWR from 'swr';

import DeleteButton from '@/components/common/buttons/delete';
import EditPostForm from '@/components/private/edit-post/form';

interface Props {
  params: {
    id: number;
  };
}

const EditPostPage = (props: Props) => {
  const {
    params: { id },
  } = props;
  const { data, error, isLoading } = useSWR(`/api/posts/${id}`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col gap-10">
        <EditPostForm post={data?.data} />
        <DeleteButton postId={data?.data?.id} />
      </div>
    </div>
  );
};

export default EditPostPage;
