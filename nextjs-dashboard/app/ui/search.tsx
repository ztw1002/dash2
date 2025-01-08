'use client'
import { useDebouncedCallback } from 'use-debounce'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

// 默认导出函数组件Search，接收一个 placeholder 属性
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  // 获取路由替换函数
  const { replace } = useRouter()

  // 防抖搜索处理函数，300ms 内只触发一次
  const handleSearch = useDebouncedCallback((term) => {
    // 创建一个新的 URLSearchParams 实例，基于当前的查询参数
    const params = new URLSearchParams(searchParams)
    // 将页面参数设置为1
    params.set('page', '1')

    // 如果搜索词存在，设置查询参数；否则删除查询参数
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    // 使用新的查询参数替换当前路径
    replace(`/dashboard/invoices?${params.toString()}`)
  }, 300)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {/* 搜索输入框 */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        // 设置输入框的默认值为当前查询参数中的 query 值
        defaultValue={searchParams.get('query')?.toString()}
      />
      {/* 放大镜图标 */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
