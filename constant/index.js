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
    ico: 'bridgeProduction',
    routePath: '/:projectId',
    homeType: 'P',
    openPage: '315035493904896'
  },
  {
    name: 'DecisionProduction(决策)',
    value: 'DecisionProduction',
    path: {
      'bridge-business-web': 'source-web/DecisionProduction',
      'source-web': 'DecisionProduction',
      DecisionProduction: ''
    },
    api: 'apiD',
    ico: 'decisionProduction',
    routePath: '/:tenantId/:orgId/:project',
    homeType: 'TOP',
    openPage: '315035493904896/315116722885120/true'
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
    ico: 'baseProduction',
    routePath: '/:projectId',
    homeType: 'P',
    openPage: '315116722885120'
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
    ico: 'baseProduction',
    routePath: '/:projectId',
    homeType: 'P',
    openPage: '315116722885120'
  }
]

exports.PROJECT_LIST = list.map(({ name, value }) => ({ name, value }))

exports.PATH_MAP = fromEntries(list.map(({ value, path }) => [value, path]))

exports.API_MAP = fromEntries(list.map(({ value, api }) => [value, api]))

exports.ROUTE_PATH_MAP = fromEntries(list.map(({ value, routePath }) => [value, routePath]))

exports.OPEN_PAGE_MAP = fromEntries(list.map(({ value, openPage }) => [value, openPage]))

exports.REPLACE_KEYWORDS = [
  /replaceProjectTitle/g,
  /replaceBaseApi/g,
  /replaceOutputDir/g,
  /replaceRoutePath/g,
  /replaceOpenPage/g
]

exports.ICO_NAME_MAP = fromEntries(list.map(({ value, ico }) => [value, ico]))

exports.HOME_TYPE_MAP = fromEntries(list.map(({ value, homeType }) => [value, homeType]))
