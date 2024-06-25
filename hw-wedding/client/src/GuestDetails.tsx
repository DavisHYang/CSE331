import { ChangeEvent, Component, MouseEvent } from "react";
import React from "react";
import { Guest, setGuestDiet, setGuestGuestDiet, setGuestGuestName, setGuestPlusOne } from "./guest";

type GuestDetailsProps = {
    // Save guest when save button clicked
    onSave: (guest: Guest) => void;

    // Go back to list page when back clicked
    onBack: () => void;

    guest: Guest;
}

type GuestDetailsState = {
    guest: Guest;

    error: string;
}

export class GuestDetails extends Component<GuestDetailsProps, GuestDetailsState> {

    constructor(props: GuestDetailsProps) {
        super(props);

        this.state = {guest: props.guest, error: ""};
    }

    render = (): JSX.Element => {
        return <div><h2>Guest Details</h2>
        <div>
            {this.renderGuestDesc()}
        </div>
        <div>
            <p>Dietary Restrictions: (Specify "none" if none)</p>
            <input type="text" value={this.state.guest.diet} 
                onChange={this.doDietChange}></input>
        </div>
        <div>
            <p>Additional Guest? <select value={this.state.guest.plus_one.toString()} 
                onChange={this.doAdditionalChange}>
                <option value="-1">unknown</option>
                <option value="0">0</option>
                <option value="1">1</option>
                </select></p>
        </div>
        <div>
            {this.renderAdditional()}
        </div>
        <div>
            <button onClick={this.doSaveClick}>Save</button>
            <button onClick={this.props.onBack}>Back</button>
        </div>
        <div>
            {this.renderError()}
        </div>
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

    // Render additional guest details if applicable
    renderAdditional = (): JSX.Element => {
        if(this.state.guest.plus_one === 1) {
            return <div>
                <div>
                    Guest Name: <input type="text" value={this.state.guest.guestName} 
                            onChange={this.doAdditionalNameChange}></input>
                </div>
                <div>
                    <p>Guest Dietary Restrictions: (Specify "none" if none)</p>
                    <input type="text" value={this.state.guest.guestDiet}
                            onChange={this.doAdditionalDietChange}></input>
                </div>
            </div>
        } else {
            return <div></div>
        }
    }
    
    // Update details UI if guest has a plus one
    doAdditionalChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        this.setState({guest: setGuestPlusOne(this.state.guest, parseInt(evt.target.value))});
    }

    // Update primary guest diet
    doDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({guest: setGuestDiet(this.state.guest, evt.target.value)});
    }

    // Update secondary guest name
    doAdditionalNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({guest: setGuestGuestName(this.state.guest, evt.target.value)});
    }

    // Update secondary guest diet
    doAdditionalDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({guest: setGuestGuestDiet(this.state.guest, evt.target.value)});
    }

    // Attempt to save guest details
    doSaveClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if(this.state.guest.diet.length === 0) {
            this.setState({error: "Must specify dietary restrictions or 'none'"});
        } else if(this.state.guest.plus_one === 1) {
            if(this.state.guest.guestName.length === 0) {
                this.setState({error: "Must specify name of additional guest"});
            } else if(this.state.guest.guestDiet.length === 0) {
                this.setState({error: "Must specify dietary restrictions of additional guest or 'none"});
            } else {
                this.props.onSave(this.state.guest);
            }
        } else {
            // Clear out additional guest's fields if N/A
            this.props.onSave(setGuestGuestDiet(setGuestGuestName(this.state.guest, ""), ""));
        } 
    }

    // Formats guest description appropriately
    renderGuestDesc = (): JSX.Element => {
        const result: JSX.Element = <>
            {this.props.guest.name}, guest of 
        </>
        if(this.props.guest.host === "James") {
            if(this.props.guest.family) {
                return <p>{result} James, family</p>
            }
            return <p>{result} James</p>
        } else {
            if(this.props.guest.family) {
                return <p>{result} Molly, family</p>
            }
            return <p>{result} Molly</p>
        }
    }
}