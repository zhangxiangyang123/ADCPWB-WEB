// （1）单体压差过大模型
// 折线图
exports.chartLineOption1 = function (xData, title1, yAxisName, yData1, title2, yData2) {
    return {
      color: ['#2763B7', '#50BBFF'],
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 20,
        itemWidth: 24,
        itemHeight: 10,
        right: "3%",
        // data: ['最高电压', '最低电压']
        data: [{
            name: title1,
          },
          {
            name: title2,
          }
        ],
      },
      grid: {
        top: '23%',
        left: '9%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        data: xData,
        // data: ['1:14:00', '1:16:00', '1:18:00', '6:33:59', '6:35:00', '6:36:00', '6:38:00', '6:40:00', '6:42:00', '6:44:00'],
      },
      yAxis: {
        type: 'value',
        min: 0,
        // name: '电压（N）',
        name: yAxisName,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontSize: '14',
          color: '#3E526F',
          fontWeight: '400'
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A7C6E0",
            //type: "dashed"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
      },
      dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [0],
        bottom: '5%',
        start: 20,
        end: 80,
        handleSize: 20,
        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //handleSize: '110%',
        handleStyle: {
          color: "transparent",
        },
        textStyle: {
          color: "transparent"
        },
        borderColor: 'transparent',
        backgroundColor: '#EEEFF3',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#C3C6D1',
      }, {
        type: "inside",
        show: true,
        // start: 1,
        // end: 35,
        // zoomOnMouseWheel: false,
        // moveOnMouseWheel: true,
        // moveOnMouseMove: true,
        // preventDefaultMouseMove: true
      }],
      series: [{
          // name: '最高电压',
          symbol: 'circle', //设定为实心点
          symbolSize: 1, //设定实心点的大小
          name: title1,
          type: 'line',
          // symbol: 'none',
          data: yData1,
          // data: [3.38, 3.36, 3.35, 3.34, 3.39, 3.42, 3.41, 3.39, 3.38, 3.41]
        },
        {
          // name: '最低电压',
          symbol: 'circle', //设定为实心点
          symbolSize: 1, //设定实心点的大小
          name: title2,
          type: 'line',
          //symbol: 'none',    
          data: yData2,
          //data:[3.2, 3.1, 3.3, 3.6, 4.1, 3.5, 3.3, 3.1,3.2, 3.1,3.8, 3.6]
          // data: [3.32, 3.34, 3.33, 3.3, 3.31, 3.28, 3.29, 3.31, 3.3, 3.36]
        }
      ]

    }
  },
  // （12）绝缘电阻突降 折线
  exports.chartLineOption3 = function (xData, title1, yAxisName, yData1, title2, yData2) {
    return {
      color: ['#2763B7', '#50BBFF'],
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 20,
        itemWidth: 24,
        itemHeight: 10,
        right: "3%",
        // data: ['最高电压', '最低电压']
        data: [{
            name: title1,
          },
          {
            name: title2,
          }
        ],
      },
      grid: {
        top: '23%',
        left: '9%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        data: xData,
        // data: ['1:14:00', '1:16:00', '1:18:00', '6:33:59', '6:35:00', '6:36:00', '6:38:00', '6:40:00', '6:42:00', '6:44:00'],
      },
      yAxis: {
        type: 'value',
        min: 0,
        // name: '电压（N）',
        name: yAxisName,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontSize: '14',
          color: '#3E526F',
          fontWeight: '400'
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A7C6E0",
            //type: "dashed"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
      },
      dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [0],
        bottom: '5%',
        start: 20,
        end: 80,
        handleSize: 20,
        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //handleSize: '110%',
        handleStyle: {
          color: "transparent",
        },
        textStyle: {
          color: "transparent"
        },
        borderColor: 'transparent',
        backgroundColor: '#EEEFF3',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#C3C6D1',
      }, {
        type: "inside",
        show: true,
        // start: 1,
        // end: 35,
        // zoomOnMouseWheel: false,
        // moveOnMouseWheel: true,
        // moveOnMouseMove: true,
        // preventDefaultMouseMove: true
      }],
      series: [{
          symbol: 'circle', //设定为实心点
          symbolSize: 1, //设定实心点的大小
          // name: '最高电压',
          name: title1,
          type: 'line',
          step: 'title1',
          // symbol: 'none',
          data: yData1,
          // data: [3.38, 3.36, 3.35, 3.34, 3.39, 3.42, 3.41, 3.39, 3.38, 3.41]
        },
        {
          symbol: 'circle', //设定为实心点
          symbolSize: 1, //设定实心点的大小
          // name: '最低电压',
          name: title2,
          type: 'line',
          step: 'title2',
          //symbol: 'none',    
          data: yData2,
          //data:[3.2, 3.1, 3.3, 3.6, 4.1, 3.5, 3.3, 3.1,3.2, 3.1,3.8, 3.6]
          // data: [3.32, 3.34, 3.33, 3.3, 3.31, 3.28, 3.29, 3.31, 3.3, 3.36]
        }
      ]

    }
  },
  // 散点图
  exports.chartLineOption2 = function (xData, title1, yAxisName, yData1, title2, yData2) {
    return {
      color: ['#2763B7', '#50BBFF'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 20,
        itemWidth: 24,
        itemHeight: 10,
        right: "3%",
        // data: ['最高电压', '最低电压']
        data: [{
            name: title1,
          },
          {
            name: title2,
          }
        ],
      },
      grid: {
        top: '23%',
        left: '9%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: { //坐标轴刻度标签的相关设置。
          show: true,
          interval: 0,
          color: '#3E526F',
        },
        axisLine: { //是否显示坐标轴轴线。
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisTick: { //坐标轴刻度相关设置。
          show: false, //是否显示坐标轴刻度。
        },
      },
      yAxis: [{
        type: 'value',
        min: 0,
        name: "电池压差（V）",
        nameLocation: "center",
        nameGap: 50,
        nameTextStyle: {
          fontSize: '14',
          color: '#3E526F',
          fontWeight: '400'
        },
        //默认以千分位显示，不想用的可以在这加一段
        axisLabel: { //调整左侧Y轴刻度， 直接按对应数据显示
          show: true,
          interval: 0, //0 强制显示所有标签。
          color: '#3E526F',
        },
        splitLine: { //坐标轴在 grid 区域中的分隔线。
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisTick: { //坐标轴刻度相关设置。
          show: false,
        },

      }, ],
      dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [0],
        bottom: '5%',
        start: 20,
        end: 80,
        handleSize: 20,
        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //handleSize: '110%',
        handleStyle: {
          color: "transparent",
        },
        textStyle: {
          color: "transparent"
        },
        borderColor: 'transparent',
        backgroundColor: '#EEEFF3',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#C3C6D1',
      }, {
        type: "inside",
        show: true,
        // start: 1,
        // end: 35,
        // zoomOnMouseWheel: false,
        // moveOnMouseWheel: true,
        // moveOnMouseMove: true,
        // preventDefaultMouseMove: true
      }],
      series: [{
          symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
          },
          emphasis: {
            label: {
              show: true,
              formatter: function (param) {
                // return param.data[3];
              },
              position: 'top'
            }
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.2, 0.3, 1, [{
              offset: 0,
              color: 'rgb(251, 118, 123)'
            }, {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }])
          },
          // name: '最高电压',
          name: title1,
          type: 'line',
          step: 'title1',
          // symbol: 'none',
          data: yData1,
          // data: [3.38, 3.36, 3.35, 3.34, 3.39, 3.42, 3.41, 3.39, 3.38, 3.41]
        },
        {
          // name: '最低电压',
          emphasis: {
            label: {
              show: true,
              formatter: function (param) {
                // return param.data[3];
              },
              position: 'top'
            }
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(129, 227, 238)'
            }, {
              offset: 1,
              color: 'rgb(25, 183, 207)'
            }])
          },
          name: title2,
          type: 'line',
          step: 'title2',
          //symbol: 'none',    
          data: yData2,
          //data:[3.2, 3.1, 3.3, 3.6, 4.1, 3.5, 3.3, 3.1,3.2, 3.1,3.8, 3.6]
          // data: [3.32, 3.34, 3.33, 3.3, 3.31, 3.28, 3.29, 3.31, 3.3, 3.36]
        }
      ]

    }
  },

  // BMS采样异常柱状图1
  exports.chartLineOption4 = function (xData, title1, yAxisName, yData1, title2, yData2) {
    return {
      color: ['#2763B7', '#50BBFF'],
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 20,
        itemWidth: 24,
        itemHeight: 10,
        right: "3%",
        // data: ['最高电压', '最低电压']
        data: [{
            name: title1,
          },
          {
            name: title2,
          }
        ],
      },
      grid: {
        top: '23%',
        left: '9%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        data: xData,
        // data: ['1:14:00', '1:16:00', '1:18:00', '6:33:59', '6:35:00', '6:36:00', '6:38:00', '6:40:00', '6:42:00', '6:44:00'],
      },
      yAxis: {
        type: 'value',
        min: 0,
        // name: '电压（N）',
        name: yAxisName,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontSize: '14',
          color: '#3E526F',
          fontWeight: '400'
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A7C6E0",
            //type: "dashed"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
      },
      dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [0],
        bottom: '5%',
        start: 20,
        end: 80,
        handleSize: 20,
        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //handleSize: '110%',
        handleStyle: {
          color: "transparent",
        },
        textStyle: {
          color: "transparent"
        },
        borderColor: 'transparent',
        backgroundColor: '#EEEFF3',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#C3C6D1',
      }, {
        type: "inside",
        show: true,
        // start: 1,
        // end: 35,
        // zoomOnMouseWheel: false,
        // moveOnMouseWheel: true,
        // moveOnMouseMove: true,
        // preventDefaultMouseMove: true
      }],
      series: [{
        // name: '最高电压',
        name: title1,
        type: 'bar',
        // symbol: 'none',
        data: yData1,
        barWidth: 10, //柱图宽度
        // data: [3.38, 3.36, 3.35, 3.34, 3.39, 3.42, 3.41, 3.39, 3.38, 3.41]
      }, ]

    }
  },
  //箱线图
  exports.boxPlotOption = function (yAxisName, boxData, data) {
    return {
      tooltip: { //提示框组件
        trigger: "item",
        axisPointer: {
          type: "shadow"
        },
        confine: true,
      },
      grid: {
        left: '9%',
        right: '4%',
        bottom: '5%',
        containLabel: true //grid 区域是否包含坐标轴的刻度标签。
      },
      xAxis: {
        show: false, //X轴刻度
        type: "category", //类目轴，适用于离散的类目数据。
        axisTick: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        min: 0, //坐标轴刻度最小值。
        //   name: '同类车辆压差（V）',
        name: yAxisName,
        nameLocation: 'center', //坐标轴名称显示位置。
        nameGap: 50, //坐标轴名称与轴线之间的距离。
        nameTextStyle: { //坐标轴名称的文字样式。
          fontSize: '14',
          color: '#3E526F',
          fontWeight: '400'
        },
        axisLabel: { //坐标轴刻度标签的相关设置。
          show: true,
          interval: 0, //0 强制显示所有标签。
          color: '#3E526F',
        },
        splitLine: { //坐标轴在 grid 区域中的分隔线。
          show: true,
          lineStyle: {
            color: "#A7C6E0",
            //type: "dashed"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisTick: { //坐标轴刻度相关设置。
          show: false,
        },

      },
      dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [0],
        bottom: '5%',
        start: 20,
        end: 80,
        handleSize: 20,
        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //handleSize: '110%',
        handleStyle: {
          color: "transparent",
        },
        textStyle: {
          color: "transparent"
        },
        borderColor: 'transparent',
        backgroundColor: '#EEEFF3',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#C3C6D1',
      }, {
        type: "inside",
        show: true,
        // start: 1,
        // end: 35,
        // zoomOnMouseWheel: false,
        // moveOnMouseWheel: true,
        // moveOnMouseMove: true,
        // preventDefaultMouseMove: true
      }],
      series: [{
          type: "boxplot",
          boxWidth: 15,
          data: boxData,
          // data: [ //盒子
          //   [55, 24, 41, 9, 55],
          // [12, 77, 15, 80, 21],
          // [25, 64, 57, 22, 35],
          // [35, 24, 55, 77, 44],
          // [44.5, 35, 33, 80, 77],
          // ],

          itemStyle: {
            normal: {
              borderColor: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: "#2BE3F5" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#2BE3F5" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              borderWidth: 2,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: "rgba(43, 227, 245, 0.7)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(43, 227, 245, 0.7)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          tooltip: {
            // show: false
            formatter: function (param) { //盒子显示内容
              console.log('omaiga', param);
              console.log('omaiga22', param.value);
              return [
                '最大值: ' + param.data[1],
                '上四分位: ' + param.data[2],
                '中位: ' + param.data[3],
                '下四分位: ' + param.data[4],
                '最小值: ' + param.data[5],
              ].join('<br/>');
            }
          }
        },
        {
          type: "scatter",
          symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAK0lEQVQYlWP8kFrLgAT+Q9mMMDEmZFlsgKACFiRjsVlFnAlwB9HAkQwMDABhFAXlxanpQwAAAABJRU5ErkJggg==",
          data: data,
          tooltip: {
            formatter: function (param) { //加号显示内容
              return [
                "压差: " + param.data,
                // 'Q3: ' + param.data[4],
                // 'Median: ' + param.data[3],
                // 'Q1: ' + param.data[2],
                // 'Lower: ' + param.data[1]
              ].join("<br/>");
            }
          }
        }
      ]
    }
  },
  //（6）电芯自放电大模型
  // 折线图96条
  exports.chartLineOption6 = function (series, xData, title1, yAxisName, title2, ) {
    return {
      // color: ['#2763B7', '#50BBFF'],
      title: {
        text: ''
      },
      // tooltip: {
      //   trigger: 'axis',
      // },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) { // 提示内容太多隔行显示内容 ,ele.name：日期；ele.data：数据
          // console.log('params', params);
          let astr = ''
          params.forEach((ele, index) => {
            // console.log('ele', ele);
            // console.log('index', index);
            astr += `
      <div style="display: block;height:20px;${index % 2 === 0 ? 'width: 42%;' : 'width: 18%;'}float:left;">
      <i style="width: 10px;height: 10px;display: inline-block;background: ${ele.color};border-radius: 10px;"></i>
      <span>${ele.name}: ${ele.data}</span>
      </div>
                            `
          })
          // 提示框大小
          const b = '<div style="width: 350px;">' + astr + '<div>'
          return b
        },
        position: function (point, params, dom, rect, size) {
          return [point[1], 0]
        }
      },
      legend: {
        top: 20,
        itemWidth: 24,
        itemHeight: 10,
        right: "3%",
        // data: ['最高电压', '最低电压']
        data: [{
            name: title1,
          },
          {
            name: title2,
          }
        ],
      },
      grid: {
        top: '23%',
        left: '9%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        data: xData,
        // data: ['1:14:00', '1:16:00', '1:18:00', '6:33:59', '6:35:00', '6:36:00', '6:38:00', '6:40:00', '6:42:00', '6:44:00'],
      },
      yAxis: {
        type: 'value',
        min: 0,
        // name: '电压（N）',
        name: yAxisName,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontSize: '14',
          color: '#3E526F',
          fontWeight: '400'
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#A7C6E0",
            //type: "dashed"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#A7C6E0"
          }
        },
        axisLabel: {
          show: true,
          interval: 0,
          color: '#3E526F',
        },
      },
      dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [0],
        bottom: '5%',
        start: 20,
        end: 80,
        handleSize: 20,
        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //handleSize: '110%',
        handleStyle: {
          color: "transparent",
        },
        textStyle: {
          color: "transparent"
        },
        borderColor: 'transparent',
        backgroundColor: '#EEEFF3',
        dataBackground: {
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'transparent'
          }
        },
        fillerColor: '#C3C6D1',
      }, {
        type: "inside",
        show: true,
        // start: 1,
        // end: 35,
        // zoomOnMouseWheel: false,
        // moveOnMouseWheel: true,
        // moveOnMouseMove: true,
        // preventDefaultMouseMove: true
      }],
      series: series,
    }
  }
