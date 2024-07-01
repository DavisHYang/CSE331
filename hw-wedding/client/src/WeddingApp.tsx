import React, { Component } from "react";
import {Guest, fromJson, newGuest, parseGuests, toJson} from "./guest";
import { GuestList } from "./GuestList";
import { GuestAdd } from "./GuestAdd";
import { GuestDetails } from "./GuestDetails";
import { isRecord } from "./record";

type Page = {kind: 'add'} | {kind: 'details'} | {kind: 'list'};

type WeddingAppState = {
  // Stores the state for the current page of the app to show
  show: Page; 

  // Stores the array of Guests
  guests: Array<Guest>; 

  // Stores the current Guest
  curGuest?: Guest;
}

/** Displays the UI of the Wedding rsvp application. */
export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {show: {kind: 'list'}, guests: []};
  }

  componentDidMount = (): void => {
    this.doRefreshTimeout(); // update our list on refresh
  };
  
  render = (): JSX.Element => {
    if(this.state.show.kind === 'list') {
      return <GuestList guests={this.state.guests} 
          onAddGuest={this.doAddClick} onLinkClick={this.doLinkClick}></GuestList>
    } else if(this.state.show.kind === 'add'){
      return <GuestAdd onSave={this.doSaveClick} 
        onBack={this.doBackClick}></GuestAdd>;
    } else if(this.state.show.kind === 'details') {
      if(this.state.curGuest === undefined) {
        return <div></div>; // Should be impossible to get to "details" page without curGuest
      } else {
        return <GuestDetails onBack={this.doBackClick} 
              onSave={this.doSaveClick} guest={this.state.curGuest}></GuestDetails>;
      }
    } else {
      return<div></div>;
    }
  };

  // Called to refresh our list of items from the server.
  doRefreshTimeout = (): void => {
    fetch("/api/names")
        .then((res) => this.doNamesResp(res))
        .catch(() => this.doNamesError("failed to connect to server"));
  };

  // Called with the response from a request to /api/list
  doNamesResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doNamesJson)
         .catch(() => this.doNamesError("200 response is not valid JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doNamesError)
         .catch(() => this.doNamesError("400 response is not text"));
    } else {
      this.doNamesError(`bad status code ${res.status}`);
    }
  };

  // Called with the JSON response from /api/list
  doNamesJson = (val: unknown): void => {
    if (!isRecord(val)) {
      console.error("bad data from /list: not a record", val)
      return;
    }

    const guests = parseGuests(val.guests);
    if (guests !== undefined)
      this.setState({guests: guests});
  };

  // Called when we fail trying to refresh the items from the server.
  doNamesError = (msg: string): void => {
    console.error(`Error fetching /list: ${msg}`);
  };

  // Changes pages to 'add' page
  doAddClick = (): void => {
    this.setState({show: {kind: 'add'}});
  };

  // Load correct Guest when link is clicked
  doLinkClick = (guest: Guest): void => { // Handled by server (load)
    fetch("/api/load?name=" + encodeURIComponent(guest.name))
    .then((res) => this.doLoadResp(guest, res))
    .catch(() => this.doLoadError("failed to connect to server"));
  };

  // Called when server responds with Guest info
  doLoadResp = (guest: Guest, res: Response): void => {
    if (res.status === 200) {
      res.json().then((val) => this.doLoadJson(guest, val))
        .catch(() => this.doLoadError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doLoadError)
        .catch(() => this.doLoadError("400 response is not text"));
    } else {
      this.doLoadError(`bad status code: ${res.status}`);
    }
  }

  // Called when Guest JSON has been parsed
  doLoadJson = (guest: Guest, val: unknown): void => {
    if (!isRecord(val) || typeof val.name !== 'string' ||
        val.guest === undefined) {
      console.error('Invalid JSON from /api/load', val);
      return;
    }
    if (val.guest === null) {
      this.setState({show: {kind: "details"}, curGuest: newGuest()});
    } else {
      this.setState({show: {kind: "details"}, curGuest: fromJson(guest)});
    }
  }

  // Called if there was an error loading Guest
  doLoadError = (msg: string): void => {
    console.error(`Error fetching /api/load: ${msg}`);
  }

  // Saves Guest info in server when save clicked
  doSaveClick = (guest: Guest): void => { // Handled by server (save)
    const body = {guest: toJson(guest), name: guest.name};
    fetch("/api/add", 
      {method: "POST", body: JSON.stringify(body), 
      headers: {'Content-Type': 'application/json'}})
      .then((res) => this.doSaveResp(guest, res))

  };

  // Called when the server responds to a request to save
  doSaveResp = (guest: Guest, res: Response): void => {
    if (res.status === 200) {
      res.json().then((val) => this.doSaveJson(guest, val))
        .catch(() => this.doSaveError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doSaveError)
        .catch(() => this.doSaveError("400 response is not text"));
    } else {
      this.doSaveError(`bad status code: ${res.status}`);
    }
  };

  // Called when the server responds to a request to save
  doSaveJson = (guest: Guest, val: unknown): void => {
    if(!isRecord(val) || typeof val.saved !== 'boolean') {
      console.error('Invalid JSON from /api/save', val);
      return;
    }
    this.doRefreshTimeout();
    this.setState({curGuest: guest, show: {kind: 'list'}});
  };

  // Called if an error occurs trying to save the file
  doSaveError = (msg: string): void => {
    console.error(`Error fetching /api/save: ${msg}`);
  };
  
  // Changes page to 'list' (no need to save anything)
  doBackClick = (): void => {
    this.setState({show: {kind: 'list'}});
  };
}