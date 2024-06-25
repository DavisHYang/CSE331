import React, { Component, ChangeEvent,  } from "react";


type FilePickerProps = {
  onCreate: (name: string) => void;

  onLinkClick: (name: string) => void;

  files: Array<string>;
};


type FilePickerState = {
  name: string;  // text in the name text box
};


/** Displays the list of created design files. */
export class FilePicker extends Component<FilePickerProps, FilePickerState> {

  constructor(props: FilePickerProps) {
    super(props);

    this.state = {name: ''};
  }

  render = (): JSX.Element => {
    // TODO: format list of files as links
    const links: JSX.Element[] = [];
    for(const fileName of this.props.files) {
      links.push(<li key={fileName}><pre><a href="#" onClick={() => this.props.onLinkClick(fileName)}>{fileName}</a></pre></li>);
    }

    return (<div>
        <h3>Files</h3>
        {<ul>{links}</ul>}
        {<input type="text" onChange={this.doNameChange}></input>}
        {<button type="button" onClick={() => this.props.onCreate(this.state.name)}>Create</button>}
      </div>);
  };

  // Updates our record with the name text being typed in
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value});
  };

  // // Updates the UI to show the file editor
  // doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
  //   if(this.state.name !== '') {
  //     this.props.onCreate(this.state.name);
  //   } else {
  //     alert("File must have a name!")
  //   }
  // };

}
