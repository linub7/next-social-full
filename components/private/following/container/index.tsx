import { useState } from 'react';

import LoadMoreButton from '@/components/common/buttons/load-more';
import FollowingList from '../list';

interface Props {}

const FollowingPageContainer = (props: Props) => {
  const [cnt, setCnt] = useState(1);
  const pages = [];
  for (let index = 0; index < cnt; index++) {
    pages.push(<FollowingList key={index} index={index} />);
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

export default FollowingPageContainer;
