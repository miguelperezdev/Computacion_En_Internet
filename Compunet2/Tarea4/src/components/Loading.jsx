import './Loading.css'

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading__grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="loading__cell" style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
      <div className="loading__text">
        <span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span>
      </div>
      <div className="loading__sub">Fetching questions from the database…</div>
    </div>
  )
}
