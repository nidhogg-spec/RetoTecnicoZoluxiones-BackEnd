
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'nidhoggspec',
  applicationName: 'serverlesszoluxiones',
  appUid: '5x78cwKN9RYQ9S7l4K',
  orgUid: '90bd7d37-be69-4adb-949d-5353c2f4ff1f',
  deploymentUid: '921c5d2b-6ea2-4f45-8839-c762546f3e33',
  serviceName: 'RetoTecnicoZoluxiones',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '6.2.2',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'dev-getElementById', timeout: 6 };

try {
  const userHandler = require('./src/controllers/getRequest.js');
  module.exports.handler = serverlessSDK.handler(userHandler.getElementById, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}