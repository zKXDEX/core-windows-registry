# core-windows-registry

## Description

The `core-windows-registry` is a Node.js library for interacting with the Windows Registry, providing a set of functions to read, write, and manipulate registry keys and values. This library is designed to be used with Node-API and is Electron ready, allowing for easy integration into desktop applications.

## Features

- No external processes required for registry operations.
- Full Node-API support for efficient native bindings.
- Electron compatibility for use in desktop application development.

## API Overview

The library exports several functions and enums for registry manipulation:

### Enums:
- `HKEY`: Represents different root keys in the Windows Registry.
- `REG`: Represents the data types for registry values.

### Functions:
- `getRegistryKey`: Retrieves a registry key along with its values and types.
- `getRegistryValue`: Retrieves a specific value from a registry key.
- `setRegistryValue`: Sets a value for a given registry key.
- `listRegistrySubkeys`: Lists subkeys under a specific registry key.
- `createRegistryKey`: Creates a new registry key.
- `deleteRegistryKey`: Deletes a registry key.

For detailed usage and examples, refer to the interface definitions in the source code.

## Installation

To use `core-windows-registry`, clone the repository and install the dependencies:

```bash
git clone https://github.com/zkxdex/core-windows-registry.git
cd core-windows-registry
npm install
or
yarn
```

## Building

To build the project, run the following command:

```bash
npm run build
```
or 
```bash
yarn run build
```

This will compile the TypeScript files, configure the build with `node-gyp`, and compile the native code.

## Testing

To run the tests, execute the following command:

```bash
npm test
```
or 
```bash
yarn test
```

Make sure you have Mocha installed as it is used for running the tests.

## Additional Documentation

For additional documentation on how to configure your environment for `node-gyp` on Windows, visit the [node-gyp Windows installation guide](https://github.com/nodejs/node-gyp#on-windows).

## Contributing

If you would like to contribute to the project, please submit issues and pull requests on GitHub, following the contribution guidelines outlined in the repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/zkxdex/core-windows-registry/blob/master/LICENSE) file for details.

---

Please replace the placeholders with the actual URLs to the `LICENSE.md` file and other resources as necessary. The installation and building instructions assume that users are familiar with the command line and have Node.js as well as npm installed. The provided script commands in the `package.json` are used for building and testing the project.
