import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout from '@/components/Layout'

import utilStyles from "../styles/utils.module.css";
import { getPostsData } from '@/lib/post'

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
  <Layout home>
    <section className={utilStyles.headingMd}>
      <p>
        こんにちは
      </p>
    </section>

    <section>
      <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, data, thumbnail}) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img 
                src={`${thumbnail}`}
                className={styles.thumbnailImage}
              />
            </Link>
            <Link legacyBehavior href={`/posts/${id}`}>
              <a className={utilStyles.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              {data}
            </small>
          </article>
        ))}
      </div> 
    </section>
  </Layout>
  )
}
