import Head from 'next/head';

import { hooks } from '../hooks';
import Navbar from "../components/navbar/navbar";
import Hook from "../components/hook/hook";

export default () => (
  <div className="page-container">
    <Head>
      <title>React Hooks</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel='stylesheet' href='/static/atom-one-dark-reasonable.css' />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
      <link href="/static/styles.css" rel="stylesheet" />
    </Head>
    <Navbar />
    {
      hooks.map(hook => (
        <Hook hook={hook} />
      ))
    }
  </div>
)
