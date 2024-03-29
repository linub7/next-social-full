import useSWR from 'swr';

import { IPost } from '@/types/post';
import PostsListItem from '../../../common/posts/list/item';

interface Props {
  index: number;
}

const FeedPageList = (props: Props) => {
  const { data, error, isLoading } = useSWR(
    `/api/posts/feed?page=${props.index}`
  );
  if (error) return <div>Failed to load.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data?.data?.map((post: IPost) => (
          <li key={post?.id} className="my-5">
            <PostsListItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedPageList;
