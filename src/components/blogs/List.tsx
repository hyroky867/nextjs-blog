import { ContentType } from '../../../types/response/blog/ContentType';
import React from 'react';
import Layout from '../Layout';
import { Grid } from '@material-ui/core';
import Date from '../Date';
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.css';
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@material-ui/lab';
import Head from 'next/head';
import { siteTitle } from '../Layout';

type Props = {
  contents: Array<ContentType>;
  current: number;
  count: number;
};

const List: React.FC<Props> = ({ contents, current, count }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Grid container>
        {contents.map((content: ContentType) => (
          <React.Fragment key={content.id}>
            <Grid container className={utilStyles.lightText} alignContent="center">
              <Date dateString={content.publishedAt} />
            </Grid>
            <Link href="items/[id]" as={`items/${content.id}`}>
              <a>
                <h2>{content.title}</h2>
              </a>
            </Link>
          </React.Fragment>
        ))}
      </Grid>
      <Grid container alignItems="center" justify="center">
        <Pagination
          page={current}
          count={count}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          renderItem={(item: PaginationRenderItemParams) => {
            return (
              <Link href="[id]" as={`${item.page}`} passHref>
                <PaginationItem {...item}></PaginationItem>
              </Link>
            );
          }}
        />
      </Grid>
    </Layout>
  );
};

export default List;
