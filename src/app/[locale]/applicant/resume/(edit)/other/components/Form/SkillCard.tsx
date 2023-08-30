interface SkillCardProps {
  skillName: string;
  id: number;
  learnedBy: string;
  onDismiss: () => void;
}

const SkillCard = ({ skillName, id, learnedBy, onDismiss }: SkillCardProps) => {
  return (
    <div
      className="m-1 py-1 px-2 mb-4 relative inline-flex items-center max-w-xs text-gray-500 bg-white rounded-lg shadow-lg border border-[#d9d9d9]"
      role="alert"
    >
      <div className="block text-sm text-gray-400">
        <span className="w-full block border-b">skill {id}</span>
        <span className="w-full">
          <span className="font-bold me-2 text-[#004992]">{skillName}</span>
          <span>Skill learned by : {learnedBy}</span>
        </span>
      </div>
      <button
        type="button"
        className="ms-auto absolute top-0 right-0 text-[#FF0000] hover:text-[#FF0000] rounded-lg p-1 inline-flex items-center justify-center h-7 w-7"
        onClick={onDismiss}
        aria-label="Close"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SkillCard;
