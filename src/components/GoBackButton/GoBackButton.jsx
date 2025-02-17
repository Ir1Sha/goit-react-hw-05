import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GoBackBtn.module.css";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.goBackButton}>
      Go Back
    </button>
  );
};

export default GoBackButton;
