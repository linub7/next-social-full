import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { IPost } from '@/types/post';

interface Props {
  post: IPost;
}

const EditPostForm = (props: Props) => {
  const router = useRouter();

  const [content, setContent] = useState(props?.post?.content);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${props?.post?.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    });

    if (res?.ok) {
      setContent('');
      router.push(`/profile`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="bg-gray-700 p-2 rounded-lg w-full my-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="bg-slate-900 p-2 rounded-lg ">
        Update Post
      </button>
    </form>
  );
};

export default EditPostForm;
