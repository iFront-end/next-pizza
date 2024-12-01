import React from "react";
import {Header} from "@/components/shared";
import styles from "./layout.module.scss"

export default function SecureLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={styles.main}>
      <Header className={styles.header} hasSearch={ false } hasCart={ false }/>
      <section className={styles.section}>
        {children}
      </section>
    </main>
  )
}
