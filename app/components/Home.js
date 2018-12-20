// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import { rustBuild, rustDiscoverVersion } from "../utils/hc-container-install";

type Props = {
  rust_version: string,
  zmq_version: string,
  container_installed: boolean
};

export default class Home extends Component<Props, {}> {
  constructor(props){
    super(props);
    // this.installRust=this.installRust.bind(this);
    this.findRustVersion=this.findRustVersion.bind(this);
  }

  componentDidMount = () => {
    this.findRustVersion();
  }

  findRustVersion = () => {
    console.log("Checking for Rust");
    rustDiscoverVersion();
  }

  // installRust = () => {
  //   console.log("Installing Rust");
  //   rustBuild();
  // }


  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
      </div>
    );
  }
}
