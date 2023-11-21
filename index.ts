// Define the structure for a registry value
export interface RegistryValue {
    name: string 
    type: REG
    value: any
}

export enum HK {
    CR = 0x80000000, // Classes root
    CU = 0x80000001, // Current user
    LM = 0x80000002, // Local machine
    U = 0x80000003,  // Users
    PD = 0x80000004, // Performance data
    CC = 0x80000005, // Current config
    DD = 0X80000006  // Current dynamic data
}

// Define the possible types of a registry value
export enum REG {
    SZ = 1,
    EXPAND_SZ = 2,
    BINARY = 3,
    DWORD = 4,
    DWORD_BIG_ENDIAN = 5,
    DWORD_LITTLE_ENDIAN = 4,
    LINK = 6,
    MULTI_SZ = 7,
    RESOURCE_LIST = 8
}

let native: any;
// Function to get the native module
function getNative () {
    if (!native) {
        native = require('./build/Release/native.node')
    }
    return native
}

// Function to get a registry key and its values
export function getRegistryKey(root: HK, path: string): { [name: string]: RegistryValue } | null {
    let ret: { [name: string]: RegistryValue } = {};
    let key = getNative().getKey(root, path);
    if (!key) {
        return null;
    }
    for (let value of key) {
        ret[value.name] = value;
    }
    return ret;
}

// Function to get a specific value of a registry key
export function getRegistryValue (root: HK, path: string, name: string): any {
    let key = getRegistryKey(root, path)
    if (!key || !key[name]) {
        return null
    }
    return key[name].value
}

// Function to set a value of a registry key
export function setRegistryValue (root: HK, path: string, name: string, type: REG.MULTI_SZ, value: string[]): any
export function setRegistryValue (root: HK, path: string, name: string, type: REG, value: string): any
export function setRegistryValue (root: HK, path: string, name: string, type: REG, value: string|string[]): any {
    return getNative().setValue(root, path, type, name, value)
}

export function listRegistrySubkeys (root: HK, path: string): string[] {
  return getNative().listSubkeys(root, path)
}

export function createRegistryKey (root: HK, path: string) {
  return getNative().createKey(root, path)
}

export function deleteRegistryKey (root: HK, path: string) {
  return getNative().deleteKey(root, path)
}