'use client';

import useSWR from 'swr';

import PostsListItem from '@/components/common/posts/list/item';
import { IPost } from '@/types/post';

interface Props {
  index: number;
  username: string;
}

const PostsList = (props: Props) => {
  const { index, username } = props;
  const { data, error, isLoading } = useSWR(
    `/api/posts?page=${index}&username=${username}`
  );
  if (error) return <div>failed to load</div>;
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <ul>
      {data?.data?.map((post: IPost) => (
        <li key={post?.id} className="my-5">
          <PostsListItem post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
