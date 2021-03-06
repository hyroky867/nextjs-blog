import { ContentType } from '../../../types/response/blog/ContentType';
import Layout from '../Layout';
import Head from 'next/head';
import Article from '../Article';
import React from 'react';
import { siteTitle } from '../Layout';

type Props = {
  content: ContentType;
};

const Item: React.FC<Props> = ({ content }: Props) => {
  return (
    <Layout>
      <Head>
        <title>
          {content.title} | {siteTitle}
        </title>
      </Head>
      <Article content={content} />
    </Layout>
  );
};

export default Item;
