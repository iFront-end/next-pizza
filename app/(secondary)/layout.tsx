import React, {ReactNode} from "react"
import { Header } from "@/components/shared/header"
import styles from "./layout.module.scss"

export default function CheckoutLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className={styles.main}>
      <Header className={styles.header} hasSearch={ false } hasCart={ false } />
      <section className={styles.section}>
        { children }
      </section>
    </main>
  )
}
