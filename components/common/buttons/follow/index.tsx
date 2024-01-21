interface Props {
  label: string;
  onClick: () => void;
}

const FollowButton = (props: Props) => {
  const { label, onClick } = props;
  return (
    <button onClick={onClick} className="bg-slate-900 p-2 rounded-lg">
      {label}
    </button>
  );
};

export default FollowButton;
