var Event = require('bcore/event')
var $ = require('jquery')
var _ = require('lodash')
var Chart = require('echarts')
// require('echarts/map/js/china')
const map = require('echarts/map/json/china.json')
Chart.registerMap('china', map)
console.log(map, 11111)
let s = null
let areas = [
  '北京',
  '河北',
  '天津',
  '湖北',
  '湖南',
  '黑龙江',
  '吉林',
  '江西',
  '浙江',
  '广西',
  '广东',
  '江苏',
  '重庆',
  '山西',
  '陕西',
  '四川',
  '福建',
  '贵州',
  '内蒙古',
  '山东',
  '云南',
  '宁夏',
  '安徽'
]
let series = [
  {
    name: '充电桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 20,
    data: [
      {
        name: '北京',
        value: [116.41667, 39.91667]
      },
      {
        name: '天津',
        value: [117.2, 39.13333]
      },
      {
        name: '广州',
        value: [113.23333, 23.16667]
      },
      {
        name: '沈阳',
        value: [123.429092, 41.796768]
      },
      {
        name: '长春',
        value: [125.324501, 43.886841]
      }
    ],
    itemStyle: {
      normal: {
        color: '#00ffff'
      }
    }
  },
  {
    name: '充电桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 18,
    data: [
      {
        name: '呼和浩特',
        value: [111.75199, 40.84149]
      },
      {
        name: '银川',
        value: [106.23248, 38.48644]
      },
      {
        name: '太原',
        value: [112.549248, 37.857014]
      },
      {
        name: '石家庄',
        value: [114.502464, 38.045475]
      },
      {
        name: '济南',
        value: [117.000923, 36.675808]
      },
      {
        name: '郑州',
        value: [113.665413, 34.757977]
      },
      {
        name: '西安',
        value: [108.948021, 34.263161]
      }
    ],
    itemStyle: {
      normal: {
        color: '#00ffff'
      }
    }
  },
  {
    name: '充电桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 16,
    data: [
      {
        name: '武汉',
        value: [114.298569, 30.584354]
      },
      {
        name: '南京',
        value: [118.76741, 32.041546]
      },
      {
        name: '合肥',
        value: [117.283043, 31.861191]
      },
      {
        name: '长沙',
        value: [112.982277, 28.19409]
      },
      {
        name: '南昌',
        value: [115.892151, 28.676493]
      },
      {
        name: '福州',
        value: [119.3, 26.08333]
      },
      {
        name: '杭州',
        value: [120.15358, 30.287458]
      }
    ],
    itemStyle: {
      normal: {
        color: '#00ffff'
      }
    }
  },
  {
    name: '充电桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 14,
    data: [
      {
        name: '南宁',
        value: [108.320007, 22.82402]
      },
      {
        name: '重庆',
        value: [106.504959, 29.533155]
      },
      {
        name: '昆明',
        value: [102.71225, 25.040609]
      },
      {
        name: '贵阳',
        value: [106.713478, 26.578342]
      },
      {
        name: '成都',
        value: [104.065735, 30.659462]
      },
      {
        name: '兰州',
        value: [103.83417, 36.06138]
      },
      {
        name: '西宁',
        value: [101.77782, 36.61729]
      }
    ],
    itemStyle: {
      normal: {
        color: '#00ffff'
      }
    }
  },
  {
    name: '加油桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 18,
    data: [
      {
        name: '北京',
        value: [116.62667, 39.91667]
      },
      {
        name: '天津',
        value: [117.41, 39.13333]
      },
      {
        name: '广州',
        value: [113.82333, 23.16667]
      },
      {
        name: '沈阳',
        value: [123.039092, 41.296768]
      },
      {
        name: '长春',
        value: [125.124501, 43.196841]
      }
    ],
    itemStyle: {
      normal: {
        color: '#1f81d6'
      }
    }
  },
  {
    name: '加油桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 16,
    data: [
      {
        name: '呼和浩特',
        value: [111.14199, 40.14149]
      },
      {
        name: '银川',
        value: [105.24248, 38.48644]
      },
      {
        name: '太原',
        value: [112.549248, 37.067014]
      },
      {
        name: '石家庄',
        value: [115.502464, 38.035475]
      },
      {
        name: '济南',
        value: [116.000923, 36.685808]
      },
      {
        name: '郑州',
        value: [113.665413, 33.747977]
      },
      {
        name: '西安',
        value: [108.948021, 33.263161]
      }
    ],
    itemStyle: {
      normal: {
        color: '#1f81d6'
      }
    }
  },
  {
    name: '加油桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 14,
    data: [
      {
        name: '武汉',
        value: [114.288569, 31.584354]
      },
      {
        name: '南京',
        value: [118.78741, 33.041546]
      },
      {
        name: '合肥',
        value: [116.293043, 31.861191]
      },
      {
        name: '长沙',
        value: [111.982277, 28.17409]
      },
      {
        name: '南昌',
        value: [115.882151, 27.676493]
      },
      {
        name: '福州',
        value: [117.32, 25.08333]
      },
      {
        name: '杭州',
        value: [121.16358, 31.297458]
      }
    ],
    itemStyle: {
      normal: {
        color: '#1f81d6'
      }
    }
  },
  {
    name: '加油桩',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: 20,
    data: [
      {
        name: '南宁',
        value: [106.330007, 22.82402]
      },
      {
        name: '重庆',
        value: [107.514959, 29.533155]
      },
      {
        name: '昆明',
        value: [102.72225, 24.050609]
      },
      {
        name: '贵阳',
        value: [106.723478, 24.588342]
      },
      {
        name: '成都',
        value: [103.065735, 30.679462]
      },
      {
        name: '兰州',
        value: [104.83417, 36.08138]
      },
      {
        name: '西宁',
        value: [102.79782, 36.61729]
      }
    ],
    itemStyle: {
      normal: {
        color: '#1f81d6'
      }
    }
  }
]
/**
 * 马良基础类
 */
module.exports = Event.extend(
  function Base(container, config) {
    this.config = {
      theme: {}
    }
    this.container = $(container) //容器
    this.apis = config.apis //hook一定要有
    this._data = null //数据
    this.chart = null //图表
    this.init(config)
  },
  {
    /**
     * 公有初始化
     */
    init: function(config) {
      //1.初始化,合并配置
      this.mergeConfig(config)
      //2.刷新布局,针对有子组件的组件 可有可无
      this.updateLayout()
      //3.子组件实例化
      this.chart = Chart.init(this.container[0])
      //4.如果有需要, 更新样式
      this.updateStyle()
    },
    /**
     * 绘制
     * @param data
     * @param options 不一定有
     * !!注意: 第二个参数支持config, 就不需要updateOptions这个方法了
     */
    render: function(data, config) {
      data = this.data(data)
      console.log(data)
      var cfg = this.mergeConfig(config)
      //更新图表
      //this.chart.render(data, cfg);
      // this.container.html(data[0].value)
      //如果有需要的话,更新样式
      this.updateStyle()
      // 使用刚指定的配置项和数据显示图表。
      var regions = [
        {
          name: this.config.noselect.nomaparea,
          itemStyle: {
            areaColor: this.config.noselect.nomapcolor
          }
        }
      ]
      let noArea = this.config.noselect.nomaparea
      if (noArea.indexOf(',') > 0) {
        let areas = noArea.split(',')
        areas.forEach((value, key, arr) => {
          regions.push({
            name: value,
            itemStyle: {
              areaColor: this.config.noselect.nomapcolor
            }
          })
        })
      }
      var option = {
        backgroundColor: this.config.backgroundColor,
        legend: {
          show: this.config.legend.show,
          top: this.config.legend.top,
          left: this.config.legend.left,
          width: this.config.legend.width,
          height: this.config.legend.height,
          orient: this.config.legend.orient,
          textStyle: {
            color: 'white'
          }
        },
        tooltip: {
          trigger: this.config.tooltip
        },
        geo: {
          map: 'china',
          show: true,
          silent: false,
          left: '12%',
          top: 40,
          roam: false,
          regions: [],
          itemStyle: {
            normal: {
              areaColor: this.config.geo.normal,
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#1B8FCF'
            }
          }
        },
        series: []
      }
      option.series = data
      // option.series = series
      this.chart.setOption(option)
      clearInterval(s)
      s = setInterval(() => {
        option.geo.regions = [
          {
            name: areas[parseInt(Math.random() * areas.length)],
            itemStyle: {
              areaColor: this.config.geo.emphasis
            }
          }
        ]
        this.chart.setOption(option)
      }, 1000)
    },
    /**
     *
     * @param width
     * @param height
     */
    resize: function(width, height) {
      this.updateLayout(width, height)
      console.log(width, height, '屏幕改变')
      //更新图表
      // this.chart.render({
      //   width: width,
      //   height: height
      // })
      this.chart.resize()
    },
    /**
     * 每个组件根据自身需要,从主题中获取颜色 覆盖到自身配置的颜色中.
     * 暂时可以不填内容
     */
    setColors: function() {
      //比如
      //var cfg = this.config;
      //cfg.color = cfg.theme.series[0] || cfg.color;
    },
    /**
     * 数据,设置和获取数据
     * @param data
     * @returns {*|number}
     */
    data: function(data) {
      if (data) {
        this._data = data
      }
      return this._data
    },
    /**
     * 更新配置
     * 优先级: config.colors > config.theme > this.config.theme > this.config.colors
     * [注] 有数组的配置一定要替换
     * @param config
     * @private
     */
    mergeConfig: function(config) {
      if (!config) {
        return this.config
      }
      this.config.theme = _.defaultsDeep(config.theme || {}, this.config.theme)
      this.setColors()
      this.config = _.defaultsDeep(config || {}, this.config)
      console.log(this.config, '更新配置')
      return this.config
    },
    /**
     * 更新布局
     * 可有可无
     */
    updateLayout: function() {},
    /**
     * 更新样式
     * 有些子组件控制不到的,但是需要控制改变的,在这里实现
     */
    updateStyle: function() {
      var cfg = this.config
      this.container.css({
        'font-size': cfg.size + 'px',
        color: cfg.color || '#fff'
      })
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
    destroy: function() {
      console.log('请实现 destroy 方法')
    }
  }
)
