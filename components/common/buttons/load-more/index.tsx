interface Props {
  onClick: () => void;
}

const LoadMoreButton = (props: Props) => {
  return (
    <button
      className="bg-slate-900 p-2 rounded-lg my-5"
      onClick={props.onClick}
    >
      Load more
    </button>
  );
};

export default LoadMoreButton;
