import { companyMetaData } from "../assets/myCompanyData";
import { Button } from "../components/ui/Button";

const HeFormSubmitButton = ({
  title,
  titleColor,
  bgColor,
  children,
  icon,
  className,
  disabledStatus,
}) => {
  return (
    <Button
      type="submit"
      disabled={disabledStatus}
      style={{
        color: titleColor || "white",
        backgroundColor: bgColor || companyMetaData?.primary,
      }}
      className={`flex items-center gap-2 ${className}`}
    >
      <h1
        className="font-semibold"
        style={{
          backgroundColor: bgColor,
          color: titleColor,
        }}
      >
        {title || children}
      </h1>
      <span style={{ backgroundColor: bgColor, color: titleColor }}>
        {icon}
      </span>
    </Button>
  );
};

export default HeFormSubmitButton;
