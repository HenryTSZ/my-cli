const { fromEntries } = require('../utils')
const list = [
  {
    name: 'BridgeProduction(桥梁)',
    value: 'BridgeProduction',
    path: {
      'bridge-business-web': 'source-web/BridgeProduction',
      'source-web': 'BridgeProduction',
      BridgeProduction: ''
    },
    api: 'apiB',
    ico: 'bridgeProduction'
  },
  {
    name: 'DecisionProduction(决策)',
    value: 'DecisionProduction',
    path: {
      'bridge-business-web': 'source-web/DecisionProduction',
      'source-web': 'DecisionProduction',
      DecisionProduction: ''
    },
    api: 'apiB',
    ico: 'decisionProduction'
  },
  {
    name: 'BaseProduction(基建项目)',
    value: 'BaseProduction',
    path: {
      'basis-facility-web': 'bimbasisstatic/BaseProduction',
      bimbasisstatic: 'BaseProduction',
      BaseProduction: ''
    },
    api: 'apiP',
    ico: 'baseProduction'
  },
  {
    name: 'EnterpriseProduction(基建企业)',
    value: 'EnterpriseProduction',
    path: {
      'basis-facility-web': 'bimbasisstatic/EnterpriseProduction',
      bimbasisstatic: 'EnterpriseProduction',
      EnterpriseProduction: ''
    },
    api: 'apiP',
    ico: 'baseProduction'
  }
]

exports.PROJECT_LIST = list.map(({ name, value }) => ({ name, value }))

exports.PATH_MAP = fromEntries(list.map(({ value, path }) => [value, path]))

exports.API_MAP = fromEntries(list.map(({ value, api }) => [value, api]))

exports.REPLACE_KEYWORDS = [/replaceProjectTitle/g, /replaceBaseApi/g, /replaceOutputDir/g]

exports.ICO_NAME_MAP = fromEntries(list.map(({ value, ico }) => [value, ico]))
