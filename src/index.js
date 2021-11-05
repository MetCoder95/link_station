const { Command, flags } = require('@oclif/command')

const getBestLinkStation = require('./lib/link-station')
const { getRandomArrayValue } = require('./lib/utils')

const DEFAULT_DEVICES = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18]
]
const DEFAULT_LINK_STATIONS = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12]
]

// TODO: Allow multiple devices
// TODO: read from a file
// TODO?: write into a file

class CLI extends Command {
  static description = 'Find the best link station for a given device'

  static usage = 'link-station <device> <[...stations]>'

  static examples = ['link-station 1,2 -s 1,2,3 4,5,6']

  static args = [
    {
      name: 'device',
      required: false,
      description:
        'The device coordinates to find the best link station for. Are coordinates separated via coma. e.g. X,Y',
      parse: input => input.split(',').map(Number)
    }
  ]

  static flags = {
    stations: flags.string({
      char: 's',
      required: false,
      description:
        'The list of stations to use. Is constituted of three values separated by a comma, Y X R(Reach).',
      multiple: true,
      parse: input => input.split(',').map(Number)
    })
  }

  validateDevice (device) {
    if (!device || device.length === 0) {
      throw new Error(
        'Device coordinates must be two values separated by a coma'
      )
    }

    device.forEach(coordinate => {
      if (isNaN(parseInt(coordinate))) {
        throw new Error('Device coordinates must a valid number')
      }
    })
  }

  validateStations (stations) {
    if (!stations || stations.length < 2) {
      throw new Error('Stations must be at least two values')
    }

    for (const [x, y, reach] of stations) {
      if (isNaN(parseInt(x)) || isNaN(parseInt(y)) || isNaN(parseInt(reach))) {
        throw new Error('Stations coordinates must a valid number')
      }
    }
  }

  async run () {
    const { args, flags } = this.parse(CLI);
    const { device = getRandomArrayValue(DEFAULT_DEVICES) } = args;
    const { stations = DEFAULT_LINK_STATIONS } = flags;

    this.validateDevice(device);
    this.validateStations(stations);

    const result = getBestLinkStation(device, stations);

    console.log(result);
  }
}

module.exports = CLI
