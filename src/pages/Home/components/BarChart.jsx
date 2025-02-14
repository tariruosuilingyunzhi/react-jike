import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

// 基于准备好的dom，初始化echarts实例

const BarChart = () => {
  const echartRef = useRef(null)
  // 绘制图表
  useEffect(() => {
    // 给挂载图表的dom实例化      获取挂载图表的dom元素
    const myChart = echarts.init(echartRef.current)
    // 图表的参数配置
    myChart.setOption({
      title: {
        text: '前端框架使用度',
      },
      tooltip: {},
      xAxis: {
        data: ['Vue', 'React', 'jQuery'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36],
        },
      ],
    })
  }, [])

  return <div ref={echartRef} style={{ width: '400px', height: '300px' }}></div>
}
export default BarChart
