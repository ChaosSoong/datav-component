var Event = require('bcore/event');
var $ = require('jquery');
var _ = require('lodash');
// var Highcharts = require('highcharts')
// require('highcharts/highcharts-3d')(Highcharts)
//var Chart = require('XXX');

/**
 * 马良基础类
 */
module.exports = Event.extend(function Base(container, config) {
  this.config = {
    theme: {}
  }
  console.log(container)
  container.id = "app"
  this.containerId = container.id
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
    var cfg = this.mergeConfig(config);
    //更新图表
  //   //this.chart.render(data, cfg);
  //   var chart = new Highcharts.Chart({
  //     chart: {
  //         renderTo: this.containerId,
  //         type: 'column',
  //         options3d: {
  //             enabled: true,
  //             alpha: 15,
  //             beta: 15,
  //             depth: 50,
  //             viewDistance: 25
  //         }
  //     },
  //     title: {
  //         text: '3D柱状图'
  //     },
  //     plotOptions: {
  //         column: {
  //             depth: 25
  //         }
  //     },
  //     series: [{
  //         name:'图例1',
  //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  //     }],
  //     credits: {
  //       // enabled:true,                    // 默认值，如果想去掉版权信息，设置为false即可
  //       text: '车主邦',             // 显示的文字
  //       href: 'http://www.czb365.com',      // 链接地址
  //       // position: {                         // 位置设置 
  //       //     align: 'left',
  //       //     x: 400,
  //       //     verticalAlign: 'bottom',
  //       //     y: -100
  //       // },
  //       // style: {                            // 样式设置
  //       //     cursor: 'pointer',
  //       //     color: 'red',
  //       //     fontSize: '30px'
  //       // }
  //   }
  // });
    // this.container.html(data[0].value)
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