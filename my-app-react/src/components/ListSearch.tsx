import React, { FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {

  const [value, setValue] = useState('')

  const nav = useNavigate()
  const { pathname } = useLocation()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  // 获取 url 参数，并设置到 input value 中

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])


  function handleSearch(value: string): void {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  return (
    <>
      <Search
        style={{ width: 260 }}
        allowClear
        size="large"
        placeholder="输入关键字"
        onChange={handleChange}
        value={value}
        onSearch={handleSearch}
      />
    </>
  )
}


export default ListSearch