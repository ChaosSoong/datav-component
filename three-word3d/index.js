var Event = require('bcore/event');
var $ = require('jquery');
var _ = require('lodash');
var THREE = require('./utils/utils').THREE;
console.log(THREE)
/**
 * 马良基础类
 */
module.exports = Event.extend(function Base(container, config) {
  this.config = {
    theme: {}
  }
  this.container = $(container);           //容器
  this.apis = config.apis;                 //hook一定要有
  this._data = null;                       //数据
  this.chart = null;                       //图表
  this.init(config);
}, {
  /**
   * 公有初始化
   */
  init: function (config) {
    //1.初始化,合并配置
    this.mergeConfig(config);
    //2.刷新布局,针对有子组件的组件 可有可无
    this.updateLayout();
    //3.子组件实例化
    //this.chart = new Chart(this.container[0], this.config);
    //4.如果有需要, 更新样式
    this.updateStyle();
  },
  /**
   * 绘制
   * @param data
   * @param options 不一定有
   * !!注意: 第二个参数支持config, 就不需要updateOptions这个方法了
   */
  render: function (data, config) {
    data = this.data(data);
    let that = this;
    var cfg = this.mergeConfig(config);
    //更新图表
    //this.chart.render(data, cfg);
    // this.container.html(data[0].value)
    var ww = 800;
    var wh = 600;

    // WebGL Rendering Engine

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(ww, wh);
    this.container.append(renderer.domElement);

    // New Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xefefef);
    scene.fog = new THREE.Fog(0x000000, 250, 1400);

    // Perspective Camera
    var camera = new THREE.PerspectiveCamera(65, ww / wh, 0.1, 1500);

    // Position x,y,z axis of camera
    camera.position.set(0, 0, 300);

    var controls = new THREE.OrbitControls(camera);

    // create the mesh from geometry and material
    var loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
      var geometry = new THREE.TextBufferGeometry('czb365', {
        font: font,
        size: that.config.size,
        height: that.config.height
      });
      var material = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = -70;
      scene.add(mesh);
    });

    var dlight = new THREE.DirectionalLight(0xffffff);
    var plight = new THREE.PointLight(0xffffff);
    plight.position.set(50, 15, 30);

    scene.add(dlight);
    scene.add(plight);

    // render the scene
    var render1 = function render1() {
      requestAnimationFrame(render1);
      controls.update();
      renderer.render(scene, camera);
    };

    render1();
    //如果有需要的话,更新样式
    this.updateStyle();
  },
  /**
   *
   * @param width
   * @param height
   */
  resize: function (width, height) {
    this.updateLayout(width, height);
    //更新图表
    //this.chart.render({
    //  width: width,
    //  height: height
    //})
  },
  /**
   * 每个组件根据自身需要,从主题中获取颜色 覆盖到自身配置的颜色中.
   * 暂时可以不填内容
   */
  setColors: function () {
    //比如
    //var cfg = this.config;
    //cfg.color = cfg.theme.series[0] || cfg.color;
  },
  /**
   * 数据,设置和获取数据
   * @param data
   * @returns {*|number}
   */
  data: function (data) {
    if (data) {
      this._data = data;
    }
    return this._data;
  },
  /**
   * 更新配置
   * 优先级: config.colors > config.theme > this.config.theme > this.config.colors
   * [注] 有数组的配置一定要替换
   * @param config
   * @private
   */
  mergeConfig: function (config) {
    if (!config) {return this.config}
    this.config.theme = _.defaultsDeep(config.theme || {}, this.config.theme);
    this.setColors();
    this.config = _.defaultsDeep(config || {}, this.config);
    return this.config;
  },
  /**
   * 更新布局
   * 可有可无
   */
  updateLayout: function () {},
  /**
   * 更新样式
   * 有些子组件控制不到的,但是需要控制改变的,在这里实现
   */
  updateStyle: function () {
    var cfg = this.config;
    this.container.css({
      'font-size': cfg.size + 'px',
      'color': cfg.color || '#fff'
    });
  },
  /**
   * 更新配置
   * !!注意:如果render支持第二个参数options, 那updateOptions不是必须的
   */
  //updateOptions: function (options) {},
  /**
   * 更新某些配置
   * 给可以增量更新配置的组件用
   */
  //updateXXX: function () {},
  /**
   * 销毁组件
   */
   destroy: function(){console.log('请实现 destroy 方法')}
});