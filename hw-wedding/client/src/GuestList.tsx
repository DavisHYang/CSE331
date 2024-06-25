import { Component } from "react";
import { Guest, guestFamily, guestRange, guestsOfHost } from "./guest";
import React from "react";

type GuestListProps = {
    // List of all Guests
    guests: Array<Guest>;

    // Callback when pressing add button
    onAddGuest: () => void;

    // Callback when pressing guest to edit details
    onLinkClick: (guest: Guest) => void;
}

type GuestListState = {
    // No state potentially
}

export class GuestList extends Component<GuestListProps, GuestListState> {

    constructor(props: GuestListProps) {
        super(props);

        this.state = {};
    }

    render = (): JSX.Element => {
        // Format GuestList as list of links
        const links: JSX.Element[] = [];
        for(const guest of this.props.guests) {
            const cur: JSX.Element = <><a href="#" onClick={() => this.props.onLinkClick(guest)}>
            {guest.name}</a> Guest of {guest.host}</>;
            if(guest.plus_one === -1) {
                links.push(<li key={guest.name}>{cur} +1?</li>);
            } else {
                links.push(<li key={guest.name}>{cur} +{guest.plus_one}</li>);
            }
        }

        // Summary of Guest info (how many guests, for who)
        const summary: JSX.Element = formatGuestSummary(this.props.guests);

        return (<div>
            {<h2>Guest List</h2>}
            {<ul>{links}</ul>}
            {<h3>Summary:</h3>}
            {summary}
            {<button type="button" onClick={this.props.onAddGuest}>Add Guest</button>}
        </div>);
    }
}

/**
 * Formats guest summary based on guest[] input
 * @param guests array of guests to process
 * @returns a JSX.Element containing guest information 
 *          formatted to display range, for whom, and the
 *          number of families
 */
const formatGuestSummary = (guests: Array<Guest>): JSX.Element => {
    // James_Guest_Range
    const JGR: {min: number, max: number} = guestRange(guestsOfHost(guests, 'James'));
    // Molly_Guest_Range
    const MGR: {min: number, max: number} = guestRange(guestsOfHost(guests, 'Molly'));
    // James_Guest_Family
    const JGF: number = guestFamily(guestsOfHost(guests, 'James'), 0);
    // Molly_Guest_Family
    const MGF: number = guestFamily(guestsOfHost(guests, 'Molly'), 0);

    const JGRElem: JSX.Element = JGR.min === JGR.max ?
    <p>{JGR.min} guest(s) of James ({JGF} family)</p> : 
    <p>{JGR.min}-{JGR.max} guest(s) of James ({JGF} family)</p>;

    const MGRElem: JSX.Element = MGR.min === MGR.max ?
    <p>{MGR.min} guest(s) of Molly ({MGF} family)</p> : 
    <p>{MGR.min}-{MGR.max} guest(s) of Molly ({MGF} family)</p>;

    return <div>{MGRElem}{JGRElem}</div>
}
