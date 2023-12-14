'use client'

// ! 12/14 Change success/cancel redirect page to dynamic session id
interface RequestInterface {
  searchParams: {
    session_id: string
  }
}
export default function Request({ searchParams }: RequestInterface ) {
  return (
    <div>
      request success/cancel
    </div>
  )
}