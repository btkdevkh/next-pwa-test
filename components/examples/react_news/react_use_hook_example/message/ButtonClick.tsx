const ButtonClick = ({
  title,
  handleClicked,
}: {
  title: string;
  handleClicked: () => void;
}) => {
  return (
    <div className="text-center">
      <button className="bg-slate-800 px-6 py-3" onClick={handleClicked}>
        {title}
      </button>
    </div>
  );
};

export default ButtonClick;
