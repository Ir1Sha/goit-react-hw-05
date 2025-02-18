import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./GoBackBtn.module.css";

const GoBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(location.state?.from || "/movies");
  };

  return (
    <button onClick={handleGoBack} className={styles.goBackButton}>
      Go Back
    </button>
  );
};

export default GoBackButton;
