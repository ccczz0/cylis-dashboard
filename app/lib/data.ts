export const logsPerHour = [
  { t: "10:20", v: 55 },
  { t: "2:19",  v: 80 },
  { t: "3:30",  v: 75 },
  { t: "54N",   v: 110 },
  { t: "60:10", v: 95 },
  { t: "1:9",   v: 130 },
  { t: "33:11", v: 160 },
  { t: "40m",   v: 148 },
];

export const attackData = [
  { ip: "182.168.1.20",   count: 90 },
  { ip: "202.0.118.5",    count: 75 },
  { ip: "198.51.100.7",   count: 58 },
  { ip: "172.16.34.22",   count: 42 },
  { ip: "10.0.0.15",      count: 28 },
];

export const logsData = [
  { time: "11:00 AM", ip1: "11:25:48",      ip2: "192.188.1.15",     type: "SQL Injection", integrity: "Tampered", status: "Malicious", statusType: "bad"  },
  { time: "11:03 AM", ip1: "11:55:46",      ip2: "208.111.36.3",     type: "Catail",        integrity: "Valid",    status: "Malicious", statusType: "bad"  },
  { time: "11:24 AM", ip1: "—",             ip2: "192.188.1.15",     type: "SQL Injection", integrity: "Tampered", status: "Monitored", statusType: "warn" },
  { time: "11:07 AM", ip1: "—",             ip2: "203.107.186.99",   type: "Brute Force",   integrity: "Valid",    status: "Monitored", statusType: "warn" },
  { time: "11:03 AM", ip1: "—",             ip2: "Russia",           type: "Brute Force",   integrity: "Valid",    status: "Monitored", statusType: "warn" },
  { time: "11:00 AM", ip1: "—",             ip2: "Russia",           type: "Brute Force",   integrity: "Valid",    status: "Monitored", statusType: "warn" },
];