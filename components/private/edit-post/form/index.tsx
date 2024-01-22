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
        className="dark:bg-gray-700 dark:text-white bg-white text-black p-2 rounded-lg w-full my-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        bg-slate-300
        type="submit"
        className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg "
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPostForm;
