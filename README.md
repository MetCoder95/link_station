link_station
============

Find the most suitable link station for a given device.
This is done by properly calculating the power, and comparing it against
the reach of the station.

To get the power of the signal from the device to the station the following formula is used:

```text
distance = sqrt(deviceX - stationX ^ 2 + (deviceY - stationY ^ 2))
power = distance > reach, power  = 0; power = (reach - distance) ^ 2
```

If a correct power is find for the given device is found (power != 0 && distance != null), the text
`Best link station for point {deviceX},{deviceY} is {stationX}{stationY} with power {power}`, otherwise
`No link station within the reach for point {deviceX},{deviceY}`.

[![Version](https://img.shields.io/npm/v/link_station.svg)](https://npmjs.org/package/link_station)
[![Downloads/week](https://img.shields.io/npm/dw/link_station.svg)](https://npmjs.org/package/link_station)
[![License](https://img.shields.io/npm/l/link_station.svg)](https://github.com/MetCoder95/link_station/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
## Arguments
- `<device>` -> The device coordinates to find the best link station for. Are coordinates separated via coma. e.g. X,Y
>If not device provided, a single device from the following options will be randomly picked: [0, 0] [100, 100] [15, 10] [18, 18]

e.g. `link-station 1,2`

## Flags
- stations - alias: `-s` -> The list of stations to use. Is constituted of three values separated by a comma, Y X R(Reach).
>If not station provided, the following stations will be used instead:[0, 0, 10], [20, 20, 5], [10, 0, 12]

e.g. `link-station 1,2 -s 1,2,3 -s 4,5,6 -s 7,8,9`
### Example
```sh-session
$ npm install -g link_station
$ link_station 1,2 -s 10,12,0 -s 123,0,3
$ Best link station for point <deviceX>,<deviceY> is <stationX>,<stationY> with power <power>
link_station/0.0.0 darwin-arm64 node-v16.4.2
$ link_station --help [COMMAND]
USAGE
  $ link_station
...
```
<!-- usagestop -->
