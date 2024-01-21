import { useRouter } from 'next/navigation';

interface Props {
  postId: number;
}

const DeleteButton = (props: Props) => {
  const { postId } = props;
  const router = useRouter();
  const handleDeletePost = async () => {
    if (window.confirm('Are you sure?')) {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/profile');
      }
    }
  };
  return (
    <button onClick={handleDeletePost} className="text-red-400">
      Delete Post
    </button>
  );
};

export default DeleteButton;
