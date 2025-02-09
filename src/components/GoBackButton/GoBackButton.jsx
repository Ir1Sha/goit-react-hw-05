import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

const GoBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = useRef(location.state?.from ?? "/movies");

  const handleGoBack = () => {
    navigate(backLink.current);
  };

  return <button onClick={handleGoBack}>Go Back</button>;
};

export default GoBackButton;
