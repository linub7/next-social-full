import Image from 'next/image';
import Link from 'next/link';

import { IPost } from '@/types/post';

interface Props {
  post: IPost;
  isEditButtonVisible?: Boolean;
}

const PostsListItem = (props: Props) => {
  const { post, isEditButtonVisible = false } = props;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const createdAt = new Date(post?.created_at);
  return (
    <div className="flex flex-row">
      <div>
        {post?.avatar ? (
          <Link href={`/${post?.username}`}>
            <Image
              src={post?.avatar}
              alt={post?.username}
              width={50}
              height={50}
              className="rounded-full mr-3"
            />
          </Link>
        ) : (
          <div
            style={{ width: 50, height: 50 }}
            className="bg-slate-600 rounded-full mr-3"
          ></div>
        )}
      </div>
      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`/${post?.username}`}>{post?.username}</Link>
        </div>
        <div className="text-slate-400">
          {createdAt.toLocaleDateString('en-us', options)}
        </div>
        <div>{post?.content}</div>
      </div>
      {isEditButtonVisible && (
        <div className="text-right flex-grow">
          <Link
            href={`/profile/edit-post/${post?.id}`}
            className="text-green-400"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostsListItem;
