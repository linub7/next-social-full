interface Props {
  label: string;
  onClick: () => void;
}

const FollowButton = (props: Props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
    >
      {label}
    </button>
  );
};

export default FollowButton;
