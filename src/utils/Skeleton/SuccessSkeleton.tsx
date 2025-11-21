"use client";

import React from "react";
import styles from "./CheckoutSkeleton.module.css";

const SuccessSkeleton = () => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        {/* Steps skeleton */}
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.skelStepCircle}></div>
            <div className={styles.skelStepLabel}></div>
          </div>

          <div className={styles.step}>
            <div className={styles.skelStepCircle}></div>
            <div className={styles.skelStepLabel}></div>
          </div>

          <div className={styles.step}>
            <div className={styles.skelStepCircle}></div>
            <div className={styles.skelStepLabel}></div>
          </div>
        </div>

        {/* Success icon + title */}
        <div className={styles.successMessage}>
          <div className={styles.skelIcon}></div>
          <div className={styles.skelTitle}></div>
          <div className={styles.skelSubtitle}></div>
        </div>

        {/* Shareable input */}
        <div className={styles.shareableLinkContainer}>
          <div className={styles.skelLabel}></div>

          <div className={styles.shareableInputContainer}>
            <div className={styles.skelInput}></div>
            <div className={styles.skelCopy}></div>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <div className={styles.skelButton}></div>
          <div className={styles.skelButton}></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessSkeleton;
