export const authConfig = {
  // TODO: passando a string de varivel de ambiente direto pro config por causa de erro no jest - 'Estudar depois como resolver isso'
  jwt: {
    // privateKey: process.env.JWT_PRIVATE_KEY,
    PRIVATE_KEY:
      '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAz+NTtoR/X5uaAokWYCP9jWPtNRZBFMt/zvU5lqZAclr6soom\nklxkp0psDtBTq7MnKxfVmKdvlOVev2M0qxTO6Ve1bR1U1NCYJW7rDco7Sab5l6gC\n+CMz7D8s2rFxeP0TeODD4Kgpg2ON/5EOMm86iV+LMEcZFGEbF+lq8eJ+aqyGmbVT\nykdz6zE2WDNZeUbc3v1c5j99oWrqDK9ZgUGGHJNx0+zFiOUVN94IZKdshvOZRCN3\nHCkGGYLt+T/9qtFSWxpi1rP2ZtrZqRqRRFjdsFJwa2Iwee75n2od/MTZ1xMT/46D\niGLmtrgVDPWRESTgi0VXKYUfmSlhC5L1H34/1QIDAQABAoIBAQDICLDjfgjmIV6H\nNAvQxLDUXSPBokFLVikMJlCckiqPHtX9+Ar3aGn9wxHJC1KHc6Krx4pjEjG+7xpF\nRJtIR4R1aU0Myl13TaQo2NracQ6tZzrhX+xDgfQTThLF+Fn8lmAnPveb85PGdoQL\nNzOW+go0ZzgSY0dRocKlNpgOWedUkiHLbzIw9zck27cDEa+zUtp/zt3MSn5rlYJO\nW+itTRA7bMFC3xdwemh8LPV6dRyzy5zZlH8WSwSJqrIW7EEwQahcIT0Lt4aIHBkQ\nPtAKin3cQRD7KV+3mNqLw8L50nmd/oTJUtJnxPBsQL/1syTQemB13rqvcvKIQjPj\nbCW4g/mdAoGBAP9lkHep16C2mTZFVNyoJGJ6HAM2pLa/AXowCJMKX0zo+mrn8fLD\nLYNnSZczC/msBMKxBf6c9N9BtSfLHvg7qgehqISaydbARN3P5gLE5pftq3RXBfJs\nt0rvTHDKz4WsTHwZKQEPZRSbjd5Il7pO5H2e28akcqMU3DfDT4emXJ9LAoGBANBh\nCN7nHTmErWL3KvmFxljZ7ZmBdE4745G+WZteAwXE3HD+3x2Va8xLYC9RTUf5dJ1F\n7u7oMyVJD4DkpT2dz4aWaZPoX+P38e6hDtmq1Ci5LXTqXu8y5mz1A3gU37CFLGuU\nDdDs4N394fDRqUR8eI8O22JeuA5BFIipxyjpoIlfAoGAaJJbbsO6KHHbld8ZeifW\njgPViHNNSg43OqKEQECU+NbEAhXqeS31asJV3XTnSFlosZbuD2yQzwEGfb6rdZRo\ncCt+5pzCXA3ppLDFSwj4KekEtOQU6UgeXK5SrDQ+eEsuHfnnUinNh3yRwBwVFBHN\neKoc7t7SmXenG6X64F37urUCgYBvM7lmKvP/o/xbmgfHDUriU7pmdx04OuGg/3IW\nZb87LultK7aptPnIFlmIJt0VEdzXqWBvAl95AFpTsLE2Bqee7Vn+Yr35jHIBpNWl\n93ItIVVO1VxATmuFreNiC9GsBAXGi0YsPp1qGnie6WRpdftobMdK4b1bbgOlQuVT\nwgm4BQKBgBLhA2KOfnQO58e2brpNC4u4B2g5cuglx07PsCTgM95ImMMi8QT5H/wy\nR04BvQURHPssKkZnMyZ1PeeStAh2dFxJJ1/KxoFyfmIiI1FfZ1ujf5nPEfbmIgdA\nMAH7bYQ6kCir18neCCVgXScr7+7gth1IyZNSCvRg/OVmKQAzCRyl\n-----END RSA PRIVATE KEY-----\n',
    // publickey: process.env.JWT_PUBLIC_KEY,
    PUBLIC_KEY:
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz+NTtoR/X5uaAokWYCP9\njWPtNRZBFMt/zvU5lqZAclr6soomklxkp0psDtBTq7MnKxfVmKdvlOVev2M0qxTO\n6Ve1bR1U1NCYJW7rDco7Sab5l6gC+CMz7D8s2rFxeP0TeODD4Kgpg2ON/5EOMm86\niV+LMEcZFGEbF+lq8eJ+aqyGmbVTykdz6zE2WDNZeUbc3v1c5j99oWrqDK9ZgUGG\nHJNx0+zFiOUVN94IZKdshvOZRCN3HCkGGYLt+T/9qtFSWxpi1rP2ZtrZqRqRRFjd\nsFJwa2Iwee75n2od/MTZ1xMT/46DiGLmtrgVDPWRESTgi0VXKYUfmSlhC5L1H34/\n1QIDAQAB\n-----END PUBLIC KEY-----\n',
    EXPIRES_IN: '30d',
    EXPIRES_REFRESH_TOKEN_DAYS: 30
  }
}
