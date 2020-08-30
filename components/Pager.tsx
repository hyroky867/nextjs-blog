import { Content } from '../types/content';
import { Grid } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

type Props = {
  prevContent?: Content;
  nextContent?: Content;
  current: number;
};

const Pager: React.FC<Props> = ({ prevContent, nextContent, current }: Props) => {
  const prevent = current - 1;
  const next = current + 1;
  return (
    <Grid container justify="space-between">
      <Grid>
        {prevContent === undefined ? (
          ''
        ) : (
          <Link
            href={`/blogs/[id]?current=${prevent}`}
            as={`blogs/${prevContent.id}?current=${prevent}`}
          >
            <a>Prev Page</a>
          </Link>
        )}
      </Grid>
      <Grid>
        {nextContent === undefined ? (
          ''
        ) : (
          <Link href={`/blogs/[id]?current=${next}`} as={`blogs/${nextContent.id}?current=${next}`}>
            <a>Next Page</a>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default Pager;
