import styles from './layout.module.css';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import Sidebar from './Sidebar';
import Header from './Header';
import React from 'react';

export const siteTitle = 'Volare Viah';

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({ children, home }: Props) => {
  const classes = useStyles();

  return (
    <Grid container className={styles.container}>
      <Header home={home} />
      <main>
        <Grid container spacing={8} className={classes.mainGrid}>
          <Grid item xs={12} md={8}>
            {children}
          </Grid>
          <Sidebar />
        </Grid>
      </main>
    </Grid>
  );
};

export default Layout;
