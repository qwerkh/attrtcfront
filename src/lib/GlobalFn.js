import {v4 as uuidv4} from 'uuid';

export function getDeviceId() {
    let deviceId = localStorage.getItem('device');
    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('device', deviceId);
    }

    return deviceId;
}