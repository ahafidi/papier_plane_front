export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center 2xl:mt-20">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
