import cmd from "node-cmd";
import Promise from 'bluebird'
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

export const discoverRustupVersion = (cb) => {
  getAsync('rustup -V').then(data => {
    // console.log('rustup version data : ', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}


export const discoverCargoVersion = (cb) => {
  getAsync('cargo -V').then(data => {
    // console.log('cargo version data : ', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}


export const rustBuild = (cb) => {
  console.log("building rust, ensuring that this is nightly build. ")
  getAsync('rustup toolchain install nightly').then(data => {
    console.log('cmd data > Installed Rust Nightly', data)
    cb(data);
  }).catch(err => {
    console.log('cmd err', err)
  });
}

// cmd.get(
//   `rustup toolchain install nightly`,
//   function(err, data, stderr) {
//     if (!err) {
//       console.log('>Installed data', data)
//       // TODO: Refresh the electron page
//     } else {
//       console.log('error', err)
//     }
//   }
// );
