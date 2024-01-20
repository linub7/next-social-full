import { ChangeEvent, FormEvent, useState } from 'react';
import { useSWRConfig } from 'swr';

interface Props {}

const ProfilePageCreateForm = (props: Props) => {
  const { mutate } = useSWRConfig();
  const [content, setContent] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content || content?.length < 10) return;

    const res = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      setContent('');
      /**
       * any of the api calls that we have made and that I cached within SWR system -> go and
       * make all of those calls again and update the data and update the component -> SWR refetch
       * all the data.
       * key is useSWR argument -> in here key in useSWR argument in PostsList component
       * const { data, error, isLoading } = useSWR(
          `/api/posts?page=${index}&username=${username}`
        );
        if you going in network tab you see that after posting a form

       */
      mutate((key) => typeof key === 'string' && key.startsWith('/api/posts'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="bg-gray-700 rounded-lg p-2 w-full my-2"
        placeholder="What is happening?"
        value={content}
        onChange={handleChangeInput}
      ></textarea>
      <button className="bg-slate-900 p-2 rounded-lg" type="submit">
        Post
      </button>
    </form>
  );
};

export default ProfilePageCreateForm;
