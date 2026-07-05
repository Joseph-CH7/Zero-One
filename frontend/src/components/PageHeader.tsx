type PageHeaderProps = {
  visibleCount: number
}

export function PageHeader({ visibleCount }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div>
        <p className="eyebrow">Internal Portal</p>
        <h1>Service Requests</h1>
        <p className="header-copy">Track employee requests for IT, HR, Facilities, and Finance.</p>
      </div>
      <div className="summary">
        <span>{visibleCount}</span>
        visible requests
      </div>
    </section>
  )
}
