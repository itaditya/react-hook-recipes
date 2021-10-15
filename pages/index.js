import Head from 'next/head';
import Highlight from 'react-highlight.js';

import { hooks } from '../hooks';

const Code = ({ children }) => <Highlight language="javascript" className="code" children={children} />;

export default () => (
  <div className="page-container">
    <Head>
      <title>React Hooks</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/atom-one-dark-reasonable.css" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
      <link href="/static/styles.css" rel="stylesheet" />
    </Head>
    <nav className="navbar">
      <main>
        <h1>React Hooks</h1>
        <a href="https://github.com/itaditya" target="_blank">
          Github
        </a>
      </main>
      <hr />
    </nav>
    {hooks.length && (
      <section>
        <h2>Table of Contents</h2>
        <ul>
        {
          hooks.map(hook => (
            <li key={hook.name}>
              <a href={`#${hook.name}`}>{hook.name}</a>
            </li>
          ))
        }
        </ul>
        <hr />
      </section>
    )}
    {
      hooks.map(hook => (
        <section key={hook.name} id={hook.name}>
          <h2 className="title">
            <a href={hook.link} target="_blank">{hook.name}</a>
            <span>- {hook.author}</span>
          </h2>
          <p className="description">
            {hook.description}
          </p>
          <main className="code-container">
            <section className="code-section">
              <h4 className="heading">Implementation</h4>
              <Code>
                {hook.implementationCode}
              </Code>
            </section>
            <section className="code-section">
              <h4 className="heading">Usage</h4>
              <Code>
                {hook.usageCode}
              </Code>
            </section>
          </main>
        </section>
      ))
    }
  </div>
);
