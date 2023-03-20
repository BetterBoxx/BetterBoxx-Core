import os from "os";

export function getIpAddress() {
	const networkInterfaces = os.networkInterfaces();
	const ipAddress = networkInterfaces["eth0"][0].address; // replace eth0 with the primary network interface of your server
	return ipAddress;
}
