// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import { rustBuild, discoverRustupVersion, discoverCargoVersion } from "../utils/hc-container-install";

type Props = {
  rust_cargo_version: string,
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
    discoverRustupVersion(res => {
      console.log("rustup result : ", res);
      if(!res) {
        rustBuild(data => {
          console.log("rustBuild resulting data : ", data);
          this.findRustVersion();
        })
      }
      else {
        discoverCargoVersion(res => {
          console.log("cargo result : ", res);
          if(!res) {
            cargoBuild(data => {
              console.log("rustBuild resulting data : ", data);
              this.findRustVersion();
            })
          }
        });
      }
    });
  }

// check OS: 
  // windows: systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
  // linux: cat /etc/os-release

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
