import cmd from "node-cmd";
import Promise from 'bluebird'
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

// Node :
export const discoverNodeVersion = (cb) => {
  return getAsync('node -v').then(data => {
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

export const nodeBuild = (cb) => {
  console.log("building node.")
  return getAsync('npm i node@lts').then(data => {
    console.log('cmd data > Installed Node', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}


// Rustup :
export const discoverRustupVersion = (cb) => {
  return getAsync('rustup -V').then(data => {
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

export const rustupBuild = (cb) => {
  console.log("building rustup, ensuring that this is nightly build. ")
  return getAsync('rustup toolchain install nightly').then(data => {
    console.log('cmd data > Installed Rust Nightly', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

// Cargo:
export const discoverCargoVersion = (cb) => {
  return getAsync('cargo -V').then(data => {
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

// Web Assembly (Configure WASM so that Rust toolchain knows how to compile Rust code to WebAssembly):
export const configureWASMtarget = (cb) => {
  return getAsync('rustup target add wasm32-unknown-unknown').then(data => {
    console.log('cmd data > Set WASM target for Rust toolchain', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

// libZMQ
// export const discoverZmqVersion = (cb) => {
// // TODO: Verify the version check for libZMQ...
//   return getAsync('zmq --version').then(data => {
//     cb(data);
//   }).catch(err => {
//     console.log('cmd err', err)
//   });
// }


// Homebrew (for Macs) :
const discoverHomebrewVersion = () => {
  return getAsync('brew -V').then(data => {
    // if(!data === "whatever is current brew") {
    //  this.installHomebrew();
    // }
  }).catch(err => {
    console.log('cmd err', err)
  });
}

const installHomebrew = (cb) => {
  return getAsync('/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"').then(data => {
    console.log('cmd data > installed Homebrew', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

// libZMQ
// Builds only work currently For Mac and linux
export const zmqBuild = (cb) => {
  console.log("building libZMQ. ");
  console.log("",process.platform);
  if(process.platform === "darwin"){
    this.checkForBrew().then(
      getAsync('brew install zmq').then(data => {
        cb(data);
      })
    )
    .catch(err => {
        console.log('cmd err', err)
    })
  }
  if(process.platform === "debian" || process.platform === "linux"){
     getAsync('wget https://download.opensuse.org/repositories/network:/messaging:/zeromq:/release-stable/Debian_9.0/Release.key -O- | sudo apt-key add').then(  d => {
       getAsync('sudo apt-get install libzmq3-dev').then(data => {
         console.log("HI lisa");
         cb(data);
       })
     }
    )
    .catch(err => {
        console.log('cmd err', err)
    })
  }
  if(process.platform === "win"){
    console.log("CONFIGURE BUILD FOR WINDOWS!!")
  }
}

// Holochain Rust
export const discoverHCrustVersion = (cb) => {
  return getAsync('hc --version').then(data => {
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

export const HCrustBuild = (cb) => {
  console.log("building HC RUST!!!! ")
// TODO: Verify downloading of hc Rust binary in CLI..
  if(process.platform === "darwin"){
     getAsync('INSTALL MAC BINARY').then(
// TODO: Verify the hc rust path setting in CLI ..
       getAsync('cd ~ && touch .bash_profile && PATH="$HOME/hc:$PATH" && source .bash_profile').then(data => {
        console.log('cmd data > Installed HC Rust!', data)
        cb(data);
      })
    )
    .catch(err => {
        console.log('cmd err', err)
    })
  }
  if(process.platform === "debian"){
     getAsync('wget -P $HOME https://github.com/holochain/holochain-rust/releases/download/holochain-nodejs-v0.2.0/index-v0.2.0-node-v57-linux-x64.tar.gz').then(
// TODO: unzip file and rename to "hc", then...
       getAsync('touch ~/.bash_profile && echo "export PATH="$HOME/hc:$PATH"" >> ~/.bash_profile && source .bash_profile').then(data => {
        console.log('cmd data > Installed HC Rust!', data)
        cb(data);
      })
    )
    .catch(err => {
        console.log('cmd err', err)
    })
  }
  if(process.platform === "win"){
    //Reference for downloading bin file in windows: https://superuser.com/questions/25538/how-to-download-files-from-command-line-in-windows-like-wget-or-curl
 //$client = new-object System.Net.WebClient
// $client.DownloadFile("http://www.xyz.net/file.txt","C:\tmp\file.txt")
     getAsync('INSTALL WINDOWS BINARY').then(
// TODO: Verify the hc rust path setting in CLI FOR WINDOWS..
       getAsync('SET PATH FOR WINDOWS...').then(data => {
        console.log('cmd data > Installed HC Rust!', data)
        cb(data);
      })
      .catch(err => {
          console.log('cmd err', err)
      })
    )
  }
}
