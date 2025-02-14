import { GetChannelApi } from '@/apis/article'
import { useState, useEffect } from 'react'

function useGetChannel() {
  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    // 获取频道列表
    const GetChannelList = async () => {
      const res = await GetChannelApi()
      setChannelList(res.data.channels)
    }
    GetChannelList()
  }, [])
  return { channelList }
}
export { useGetChannel }
