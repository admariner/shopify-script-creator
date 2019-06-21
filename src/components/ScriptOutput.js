import React, { Component } from 'react';
import { Card, TextField, Select, Stack } from '@shopify/polaris';
import HelpIcon from './HelpIcon';
import styles from './ScriptOutput.css';

export default class ScriptOutput extends Component {
  constructor(props) {
    super(props);
    this.copyOutputCode = this.copyOutputCode.bind(this);
    this.setMinification = this.setMinification.bind(this);

    this.state = {
      minificationLevel: 0,
    }
  }

  copyOutputCode() {
    // Google Analytics
    gtag('event', 'copyButtonClick', {'value': this.props.output.length});
    this.textField.input.select();
    document.execCommand('selectAll');
    document.execCommand('copy');
  }

  setMinification(selection) {
    this.props.setMinification(selection);
    this.setState({minificationLevel: selection});
  }

  render() {
    const copy = {
      content: "Copy",
      icon: "duplicate",
      onAction: this.copyOutputCode
    };

    const {
      currentCount,
      maxCount
    } = this.props;

    const overLimit = currentCount > maxCount;

    return (
      <Card title="Script code" sectioned actions={[copy]}>
        <Stack vertical>
          <Stack distribution="equalSpacing" alignment="trailing">
              <Stack>
                <Select
                  label="Minification Level"
                  value={this.state.minificationLevel}
                  options={[{value:"0", label:"None"}, {value:"1", label:"1"}]}
                  onChange={this.setMinification}
                />
                <HelpIcon url="https://github.com/jgodson/shopify-script-creator/wiki/Minification-of-generated-code" external />
              </Stack>
            <div className="count"><span className={overLimit ? 'overlimit' : null}>{currentCount}</span>/<span>{maxCount}</span></div>
          </Stack>
          <TextField
            id="ScriptOutput"
            multiline={10}
            readOnly
            value={this.props.output}
            ref={(input) => this.textField = input}
            helpText="Copy the code here and paste into a new script in the Script Editor App. Be sure to create the proper script based on the type that you selected."
          />
        </Stack>
      </Card>
    )
  }
}
