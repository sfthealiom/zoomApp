import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const HePopupMessage = ({
  title,
  message,
  buttonText,
  setShowPopup,
  className,
  style,
}) => {
  return (
    <div
      className={`flex items-start p-4 shadow-xl border border-slate-200 bg-white z-10 rounded-md ${className}`}
      style={style}
    >
      <div>
        {title && <h1 className="font-semibold text-sm">{title}</h1>}
        {message && <p className="max-w-xs text-sm">{message}</p>}
        {buttonText && (
          <button
            type="button"
            onClick={() => {
              setShowPopup(false);
            }}
            className="mt-2 border-2 border-slate-400 p-1 rounded-md text-sm text-slate-500 font-semibold"
          >
            {buttonText}
          </button>
        )}
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => {
          setShowPopup(false);
        }}
        className="h-4 w-4 text-slate-500 cursor-pointer"
      />
    </div>
  );
};

export default HePopupMessage;
