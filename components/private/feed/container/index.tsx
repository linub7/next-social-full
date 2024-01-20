'use client';

import { useState } from 'react';

import FeedPageList from '../list';
import LoadMoreButton from '@/components/common/buttons/load-more';

interface Props {}

const FeedPageContainer = (props: Props) => {
  const [cnt, setCnt] = useState(1);

  const pages = [];

  for (let index = 0; index < cnt; index++) {
    pages.push(<FeedPageList key={index} index={index} />);
  }

  return (
    <div>
      {pages}
      <div className="flex justify-center">
        <LoadMoreButton onClick={() => setCnt((prev) => prev + 1)} />
      </div>
    </div>
  );
};

export default FeedPageContainer;
