"use client";

import React from "react";
import styles from "./CheckoutSkeleton.module.css";

const CheckoutSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.section}>
            <div className={styles.skelTitle}></div>
            <div className={styles.skelLine}></div>
            <div className={styles.skelLine}></div>
          </div>

          <div className={styles.section}>
            <div className={styles.skelTitle}></div>
            <div className={styles.skelLine}></div>
            <div className={styles.skelLine}></div>
            <div className={styles.skelBox}></div>
          </div>

          <div className={styles.skelButton}></div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.skelTitleSmall}></div>
          <div className={styles.skelImage}></div>
          <div className={styles.skelInput}></div>
          <div className={styles.skelLine}></div>
          <div className={styles.skelLineLarge}></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
