interface Props {
  btnTitle: string;
}

const CommonAuthButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="mt-4 dark:bg-slate-900 bg-slate-400 text-white p-3 rounded-lg"
    >
      {props.btnTitle}
    </button>
  );
};

export default CommonAuthButton;
