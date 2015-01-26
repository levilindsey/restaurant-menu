var config = {};

config.srcPath = 'src';
config.distPath = 'dist';
config.resPath = 'res';
config.bowerPath = 'bower_components';

config.publicPath = config.srcPath + '/public';
config.serverPath = '../' + config.srcPath + '/server';

config.scriptsDist = config.distPath + '/scripts';
config.stylesDist = config.distPath + '/styles';
config.imageDist = config.distPath + '/images';

config.serverMainPath = config.serverPath + '/main';

config.karmaConfigPath = config.srcPath + '/karma.conf.js';

config.scriptDistFileName = 'restaurant-menu.js';
config.vendorScriptDistFileName = 'lib.js';
config.vendorStyleDistFileName = 'lib.css';

config.distGlob = config.distPath + '/**';

config.scriptsDistFilePath = config.scriptsDist + '/' + config.scriptDistFileName;
config.frontEndTestsSrc = config.publicPath + '/**/*_test.js';
config.backEndTestsSrc = config.serverPath + '/**/*_test.js';

config.allFilesForFrontEndTests = [
  config.scriptsDist + '/' + config.vendorScriptDistFileName,
  config.scriptsDistFilePath,
  config.frontEndTestsSrc
];

config.indexSrc = config.publicPath + '/index.html';

config.scriptsSrc = [
  config.publicPath + '/**/*.js',
  '!' + config.frontEndTestsSrc,
  '!' + config.backEndTestsSrc
];
config.stylesPartialsSrc = config.publicPath + '/**/_*.scss';
config.stylesMainSrc = config.publicPath + '/main.scss';
config.stylesSrc = config.publicPath + '/**/*.scss';
config.imagesSrc = config.resPath + '/images/**/*.+(png|jpg|gif)';
config.mediaSrc = [config.resPath + '/**', '!' + config.imagesSrc];
config.iconsSrc = config.resPath + '/images/icons/*.svg';
config.deviceIconsSrc = config.resPath + '/images/device-icons/*';

// TODO: these source arrays need to be manually kept up-to-date with the front-end libraries that are used in this app
config.vendorScriptsSrc = [
];
config.vendorScriptsMinSrc = [
];
config.vendorStylesSrc = [
];
config.vendorStylesMinSrc = [
];

config.buildTasks = [
  'scripts',
  'styles',
  'vendor-scripts',
  'vendor-styles',
  'index',
  'copy-media',
  'copy-device-icons',
  'compress-images'
];

config.host = '0.0.0.0';
config.port = 3000;

module.exports = config;
