import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path, find, replace, split, Color, toColor, solid  } from './square';
import { SquareElem } from "./square_draw";
import { len, prefix } from "./list";


type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;

  // TODO: may want to add more props

  onBack: () => void;

  /** Name of the file being edited */
  name: string;
};


type FileEditorState = {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;

  /** Color of the square currently clicked on, if any */
  selectedColor?: Color;

  /** Whether or not the user is editing a square */
  editing: boolean;
};


/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {

  constructor(props: FileEditorProps) {
    super(props);

    this.state = { root: props.initialState, editing: false };
  }

  render = (): JSX.Element => {
    if(this.state.editing) {
      return <div>
      <SquareElem width={600n} height={600n}
                      square={this.state.root} selected={this.state.selected}
                      onClick={this.doSquareClick}></SquareElem>
        <button type="button" onClick={this.doSplitClick}>Split</button>
        <button type="button" onClick={this.doMergeClick}>Merge</button>
        <select value={this.state.selectedColor} onChange={this.doColorChange}>
          <option value={"white"}>White</option>
          <option value={"red"}>Red</option>
          <option value={"orange"}>Orange</option>
          <option value={"yellow"}>Yellow</option>
          <option value={"green"}>Green</option>
          <option value={"blue"}>Blue</option>
          <option value={"purple"}>Purple</option>
        </select>
        <button type="button" onClick={() => this.props.onSave(this.props.name, this.state.root)}>Save</button>
        <button type="button" onClick={this.props.onBack}>Back</button>
      </div>;
    } else {
      return <div>
        <SquareElem width={600n} height={600n}
        square={this.state.root} selected={this.state.selected}
        onClick={this.doSquareClick}></SquareElem>
        <button type="button" onClick={() => this.props.onSave(this.props.name, this.state.root)}>Save</button>
        <button type="button" onClick={this.props.onBack}>Back</button>
        </div>;
    }
  };

  doSquareClick = (path: Path): void => {
    const curSquare: Square = find(this.state.root, path)
    if(curSquare.kind !== 'split') {
      this.setState({selected: path, editing: true, selectedColor: curSquare.color});
    } else {
      // shouldn't be possible to select a split square
    }
  }

  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if(typeof(this.state.selected) !== 'undefined') {
      const s: Square = find(this.state.root, this.state.selected);
      this.setState({root: replace(this.state.root, this.state.selected, split(s, s, s, s)), 
        selected: undefined, editing: false, selectedColor: undefined});
    }
  };

  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if(typeof(this.state.selected) !== 'undefined') {
      if(this.state.selected.kind !== 'nil') { // check if square is split (path is not nil)
        const parentPath: Path = prefix(len(this.state.selected)-1n, this.state.selected);
        this.setState({root: replace(this.state.root, parentPath, find(this.state.root, this.state.selected)), 
          editing: false, selected: undefined, selectedColor: undefined});
      } else {
        alert("Cannot merge a solid Square!");
      }
    }
  };

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    if(typeof(this.state.selected) !== 'undefined') {
      this.setState({root: replace(this.state.root, this.state.selected, solid(toColor(evt.target.value))),
        editing: false, selected: undefined, selectedColor: undefined});
    }
  };
}
