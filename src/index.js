const { Command, flags } = require('@oclif/command');

const getBestLinkStation = require('./lib/link-station');
const { getRandomArrayValue } = require('./lib/utils');

const DEFAULT_DEVICES = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18],
];
const DEFAULT_LINK_STATIONS = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12],
];

// TODO: Allow multiple devices
// TODO: read from a file
// TODO?: write into a file

/**
 * CLI instance
 */
class CLI extends Command {
  static description = 'Find the best link station for a given device';

  static usage = 'link-station [device] ';

  static examples = ['link-station 1,2 -s 1,2,3 4,5,6'];

  static args = [
    {
      name: 'device',
      required: false,
      description:
        'The device coordinates to find the best link station for. Are coordinates separated via coma. e.g. X,Y',
      parse: (input) => input.split(',').map(Number),
    },
  ];

  static flags = {
    stations: flags.string({
      char: 's',
      required: false,
      description:
        'The list of stations to use. Is constituted of three values separated by a comma, Y X R(Reach).',
      multiple: true,
      parse: (input) => input.split(',').map(Number),
    }),
  };

  validateDevice(device) {
    if (!device || device.length === 0) {
      this.error('Device coordinates must be two values separated by a coma', {
        exit: 1,
      });
    }

    device.forEach((coordinate) => {
      if (isNaN(parseInt(coordinate))) {
        this.error('Device coordinates must be a valid number', { exit: 1 });
      }
    });
  }

  validateStations(stations) {
    if (!stations || stations.length < 2) {
      return this.error('Stations must be at least two values', { exit: 1 });
    }

    for (const [x, y, reach] of stations) {
      if (isNaN(parseInt(x)) || isNaN(parseInt(y)) || isNaN(parseInt(reach))) {
        this.error('Stations coordinates must a valid number', { exit: 1 });
      }
    }
  }

  async run() {
    const { args, flags } = this.parse(CLI);
    const { device = getRandomArrayValue(DEFAULT_DEVICES) } = args;
    const { stations = DEFAULT_LINK_STATIONS } = flags;

    this.validateDevice(device);
    this.validateStations(stations);

    this.log(
      `Finding the best link station for device ${device}, with Link Stations ${stations.join(
        '/'
      )}`
    );
    const result = getBestLinkStation(device, stations);

    this.log(result);
  }
}

module.exports = CLI;
