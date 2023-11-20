// Define the structure for a registry value
export interface RegistryValue {
    name: string; // The name of the registry value
    type: REG; // The type of the registry value
    value: string; // The value of the registry value
}

// Define the possible root keys in the registry
export enum HKEY{
    CR = 0x80000000, // Classes root
    CU = 0x80000001, // Current user
    LM = 0x80000002, // Local machine
    U = 0x80000003,  // Users
    PD = 0x80000004, // Performance data
    CC = 0x80000005, // Current config
    CD = 0x80000006, // Current dynamic data
}

// Define the possible types of a registry value
export enum REG{
    SZ = 1, // String value
    EXPAND_SZ = 2, // Expandable string value
    BINARY = 3, // Binary data value
    DWORD = 4, // DWORD value
    DWORD_BIG_ENDIAN = 5, // DWORD value in big-endian format
    DWORD_LITTLE_ENDIAN = 4, // DWORD value in little-endian format
    LINK = 6, // Symbolic link value
    MULTI_SZ = 7, // Multiple strings value
    RESOURCE_LIST = 8, // Resource list value
}

// Native module for registry operations
let native: any; 

// Function to get the native module
function getNative(){
    if(!native){
        native = require('./build/Release/registry.node')
    }
    return native;
}

// Function to get a registry key and its values
export function getRegistryKey(root: HKEY, path: string): { [name: string]: RegistryValue } | null {
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
export function getRegistryValue (root: HKEY, path: string, name: string): any {
    let key = getRegistryKey(root, path)
    if (!key || !key[name]) {
        return null
    }
    return key[name].value
}

// Function to set a value of a registry key
export function setRegistryValue (root: HKEY, path: string, name: string, type: REG.MULTI_SZ, value: string[]): any
export function setRegistryValue (root: HKEY, path: string, name: string, type: REG, value: string): any
export function setRegistryValue (root: HKEY, path: string, name: string, type: REG, value: string|string[]): any {
    return getNative().setValue(root, path, type, name, value)
}

// Function to list all subkeys of a registry key
export function listRegistrySubkeys (root: HKEY, path: string): string[] {
  return getNative().listSubkeys(root, path)
}

// Function to create a registry key
export function createRegistryKey (root: HKEY, path: string) {
  return getNative().createKey(root, path)
}

// Function to delete a registry key
export function deleteRegistryKey (root: HKEY, path: string) {
  return getNative().deleteKey(root, path)
}