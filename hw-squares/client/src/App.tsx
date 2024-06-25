import React, { Component } from "react";
import { solid, split, Square } from './square';
import { FileEditor } from "./FileEditor";
import { FilePicker } from "./FilePicker";
import { listFiles, loadFile, saveFile } from "./server";

const GENERICSQUARE: Square = split(solid("blue"), solid("orange"), solid("purple"), solid("red"));

/** Describes set of possible app page views */
type Page = {kind: "start"} | {kind: "edit"};       

type AppState = {
  show: Page;   // Stores state for the current page of the app to show

  name: string // Stores the name of the current page, if any

  files: Array<string>;

  sq: Square;

  loading: boolean;

  saved?: boolean;
};

/**
 * Displays the square application containing either a list of files names
 * to pick from or an editor for files files
 */
export class App extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    this.state = {show: {kind: "start"}, name: "", files: [], 
    sq: GENERICSQUARE, loading: true, saved: undefined};
  }
  
  render = (): JSX.Element => {
    if(this.state.loading) {
      listFiles(this.doListFileResp);
      return <p>Loading...</p>;
    } else {
      if(this.state.show.kind === "start") {
        return <FilePicker onLinkClick={this.doLinkClick} 
          onCreate={this.doCreateClick} files={this.state.files}></FilePicker>;
      }
      return <FileEditor initialState={this.state.sq} onSave={this.doSaveClick} 
        name={this.state.name} onBack={this.doBackClick}></FileEditor>;
    }
  };

  // TODO: write functions here to handle switching between app pages and
  //       for accessing server through server.ts helper functions

  doSaveClick = (fileName: string, root: Square): void => {
    this.setState({loading: true, sq: root});
    saveFile(fileName, root, this.doSaveResp);
  }

  doSaveResp = (name: string, saved: boolean): void => {
    this.setState({name: name, saved: saved});
    this.setState({loading: false});
  }

  doBackClick = (): void => {
    this.setState({show: {kind: "start"}, loading: false});
  }

  doCreateClick = (fileName: string): void => {
    if(this.state.files.includes(fileName)) {
      alert("Cannot have duplicate file names!");
    } else if(fileName !== "") { // File must have a name
      this.setState({loading: true, sq: GENERICSQUARE});
      saveFile(fileName, GENERICSQUARE, this.doCreateResp);
      listFiles(this.doListFileResp);
    } else {
      alert("File must be named!");
    }
  }

  doCreateResp = (name: string, saved: boolean): void => {
    if(!this.state.files.includes(name)) {
      this.setState({name: name, saved: saved, show: {kind: "edit"}});
    }
  }

  doListFileResp = (names: Array<string>): void => {
    this.setState({files: names});
    this.setState({loading: false});
  }

  doLinkClick = (fileName: string): void => {
    this.setState({loading: true});
    loadFile(fileName, this.doLinkClickResp);
  }

  doLinkClickResp = (name: string, sq: Square | null): void => {
    if(sq !== null) {
      this.setState({show: {kind: "edit"}, name: name, 
      sq: sq, loading: false});
    } else {
      alert("Something went wrong");
    }
  }
}
