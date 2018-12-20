import cmd from "node-cmd";
import Promise from 'bluebird'
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

export const rustDiscoverVersion = () => {
  console.log("building rust, ensuring that this is nightly build. ")

  getAsync('rustup -v').then(data => {
    console.log('rust version data : ', data)
  }).catch(err => {
    console.log('cmd err', err)
  });
}

export const rustBuild = () => {
  console.log("building rust, ensuring that this is nightly build. ")

  getAsync('rustup toolchain install nightly').then(data => {
    console.log('cmd data > Installed Rust Nightly', data)
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
