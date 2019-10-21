import Head from 'next/head';

import { hooks } from '../hooks';
import Code from "../components/code/code";
import Clipboard from "../components/clipboard/clipboard";
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
        // <section key={hook.name}>
        //   <h2 className="title">
        //     <a href={hook.link} target="_blank">{hook.name}</a>
        //     <span>- {hook.author}</span>
        //   </h2>
        //   <p className="description">
        //     {hook.description}
        //   </p>
        //   <main className="code-container">
        //     <section className="code-section">
        //       <h4 className="heading">Implementation</h4>
        //       <Code>
        //         {hook.implementationCode}
        //       </Code>
        //       <Clipboard />
        //     </section>
        //     <section className="code-section">
        //       <h4 className="heading">Usage</h4>
        //       <Code>
        //         {hook.usageCode}
        //       </Code>
        //     </section>
        //   </main>
        // </section>
      ))
    }
  </div>
)
