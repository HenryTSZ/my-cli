exports.PATH_MAP = {
  BridgeProduction: {
    'bridge-business-web': 'source-web/BridgeProduction',
    'source-web': 'BridgeProduction',
    BridgeProduction: ''
  },
  BaseProduction: {
    'basis-facility-web': 'bimbasisstatic/BaseProduction',
    bimbasisstatic: 'BaseProduction',
    BaseProduction: ''
  },
  EnterpriseProduction: {
    'basis-facility-web': 'bimbasisstatic/EnterpriseProduction',
    bimbasisstatic: 'EnterpriseProduction',
    EnterpriseProduction: ''
  }
}

exports.API_MAP = {
  BridgeProduction: 'apiB',
  BaseProduction: 'apiP',
  EnterpriseProduction: 'apiP'
}

exports.REPLACE_KEYWORDS = [/replaceProjectTitle/g, /replaceBaseApi/g, /replaceOutputDir/g]

exports.ICO_NAME_MAP = {
  BridgeProduction: 'bridgeProduction',
  BaseProduction: 'baseProduction',
  EnterpriseProduction: 'baseProduction'
}
