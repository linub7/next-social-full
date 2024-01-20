import { useState } from 'react';

import PostsList from '../list';
import LoadMoreButton from '../../buttons/load-more';

interface Props {
  username: string;
}

const PostsContainer = (props: Props) => {
  const [cnt, setCnt] = useState(1);
  const pages = [];
  for (let index = 0; index < cnt; index++) {
    pages.push(
      <PostsList key={index} index={index} username={props.username} />
    );
  }
  return (
    <div className="my-5">
      {pages}
      <div className="flex justify-center">
        <LoadMoreButton onClick={() => setCnt((prev) => prev + 1)} />
      </div>
    </div>
  );
};

export default PostsContainer;
