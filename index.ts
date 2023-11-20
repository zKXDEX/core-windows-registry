export interface RegistryValue {
    name: string;
    type: REG;
    value: string;
}

export enum HKEY{
    CR = 0x80000000, // classes root
    CU = 0x80000001, // current user
    LM = 0x80000002, // local machine
    U = 0x80000003,  // users
    PD = 0x80000004, // performance data
    CC = 0x80000005, // current config
    CD = 0x80000006, // current dynamic data
}


export enum REG{
    SZ = 1,
    EXPAND_SZ = 2,
    BINARY = 3,
    DWORD = 4,
    DWORD_BIG_ENDIAN = 5,
    DWORD_LITTLE_ENDIAN = 4,
    LINK = 6,
    MULTI_SZ = 7,
    RESOURCE_LIST = 8,
}


let native: any; 
function getNative(){
    if(!native){
        native = require('./build/Release/registry.node')
    }
    return native;
}

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

export function getRegistryValue (root: HKEY, path: string, name: string): any {
    let key = getRegistryKey(root, path)
    if (!key || !key[name]) {
        return null
    }
    return key[name].value
}

export function setRegistryValue (root: HKEY, path: string, name: string, type: REG.MULTI_SZ, value: string[]): any
export function setRegistryValue (root: HKEY, path: string, name: string, type: REG, value: string): any
export function setRegistryValue (root: HKEY, path: string, name: string, type: REG, value: string|string[]): any {
    return getNative().setValue(root, path, type, name, value)
}

export function listRegistrySubkeys (root: HKEY, path: string): string[] {
  return getNative().listSubkeys(root, path)
}

export function createRegistryKey (root: HKEY, path: string) {
  return getNative().createKey(root, path)
}

export function deleteRegistryKey (root: HKEY, path: string) {
  return getNative().deleteKey(root, path)
}