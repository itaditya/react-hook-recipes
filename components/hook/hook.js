import { Component } from "react";

import Code from "../code/code";
import Clipboard from "../clipboard/clipboard";

class Hook extends Component {
  constructor(props){
    super(props);
    this.hook = props.hook;
  }

  render(){
    return (
      <section key={this.hook.name}>
        <h2 className="title">
          <a href={this.hook.link} target="_blank">{this.hook.name}</a>
          <span>- {this.hook.author}</span>
        </h2>
        <p className="description">
          {this.hook.description}
        </p>
        <main className="code-container">
          <section className="code-section">
            <h4 className="heading">Implementation</h4>
            <Code>
              {this.hook.implementationCode}
            </Code>
            <Clipboard />
          </section>
          <section className="code-section">
            <h4 className="heading">Usage</h4>
            <Code>
              {this.hook.usageCode}
            </Code>
            <Clipboard />
          </section>
        </main>
      </section>
    )
  }
}

export default Hook;