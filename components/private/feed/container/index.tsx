'use client';

import { useState } from 'react';
import FeedPageList from '../list';

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
        <button
          className="bg-slate-900 p-2 rounded-lg"
          onClick={() => setCnt((prev) => prev + 1)}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default FeedPageContainer;
