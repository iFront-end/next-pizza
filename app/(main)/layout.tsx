import React, {Suspense} from "react"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import styles from "./layout.module.scss"

export default function MainLayout(
  { children, modal }: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>
) {
  return (
    <main className={styles.main}>
      <Suspense>{ modal }</Suspense>
      <Header className={styles.header} />
      <section className={styles.section}>
        { children }
      </section>
      <Footer className={styles.footer} />
    </main>
  )
}
