import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>Page Not Found</h1>
      <p className={styles.notFoundText}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
