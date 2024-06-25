import { ChangeEvent, Component, MouseEvent} from "react";
import React from "react";
import { Guest, newGuest, setGuestFamily } from "./guest";

type GuestAddProps = {
    // Save guest when save button clicked
    onSave: (guest: Guest) => void;

    // Go back to list page when back clicked
    onBack: () => void;
}

type GuestAddState = {
    name: string; // name of guest

    host?: string; // name of host (if selected)

    family: boolean; // true if family

    error: string; // for displaying errors
}

export class GuestAdd extends Component<GuestAddProps, GuestAddState> {

    constructor(props: GuestAddProps) {
        super(props);

        this.state = {name: "", host: undefined, family: false, error: ""};
    }

    render = (): JSX.Element => {
        return <div>
                <h2>Add Guest</h2>
            <div>
                Name: <input type="text" onChange={this.doNameChange}></input>
                <p></p>
            </div>
            <div>
                <label>Guest of:</label>
                    <p><input type="radio" id="Molly" value="Molly" name="host" 
                        onClick={this.doHostClick}></input> <label>Molly</label></p>
                    <p><input type="radio" id="James" value="James" name="host"
                        onClick={this.doHostClick}></input> <label>James</label></p>
            </div>
            <div>
                <input type="checkbox" id="family" value="family" name="family"
                    onClick={this.doFamilyClick}></input> Family?
            </div>
            <p></p>
            <div>
                <button type="button" onClick={this.doSaveClick}>Add</button>
                <button type="button" onClick={this.props.onBack}>Back</button>
            </div>
            {this.renderError()}
        </div>;
    };

    // Render any errors (i.e. missing required field)
    renderError = (): JSX.Element => {
        if(this.state.error.length === 0) {
            return <div></div>;
        } else {
            const style = {width: '300px', backgroundColor: 'rgb(246,194,192)',
                border: '1px solid rgb(137,66,61)', borderRadius: '5px', padding: '5px' };
            return (<div style={{marginTop: '15px'}}>
                <span style={style}><b>Error</b>: {this.state.error}</span>
                </div>);
        }
    }

    // Update state to match host radio button
    doHostClick = (evt: MouseEvent<HTMLInputElement>): void => {
        this.setState({host: evt.currentTarget.value, error: ""})
    };

    // Update state to match family checkbox
    doFamilyClick = (_evt: MouseEvent<HTMLInputElement>): void => {
        this.setState({family: !this.state.family, error: ""});
    }

    // Update state to match name textbox
    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({name: evt.target.value, error: ""});
    };

    // Attemp to save guest with current state
    doSaveClick = (_: MouseEvent<HTMLButtonElement>): void => {
        if(this.state.name.length === 0) {
            this.setState({error: "Name is required"});
        } else if(this.state.host === undefined) {
            this.setState({error: "Host is required"});
        } else {
            this.props.onSave(setGuestFamily(newGuest(this.state.name, this.state.host), this.state.family));
        }
    }
}