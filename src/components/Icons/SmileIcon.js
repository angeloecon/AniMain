const SmileIcon = ({className="w-5 h-5"}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 9a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75V9zm5.25-.75a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h.008zM12 16.5a4.5 4.5 0 01-3.666-1.928.75.75 0 111.228-.885 3 3 0 004.876 0 .75.75 0 111.228.885A4.5 4.5 0 0112 16.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default SmileIcon;
