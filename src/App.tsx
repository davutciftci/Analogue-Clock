import { useEffect, useRef } from 'react'

function App() {
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function setDate() {
      const now = new Date()

      const getSecond = now.getSeconds()
      const getMinute = now.getMinutes()
      const getHour = now.getHours()

      const secondDegree = (getSecond / 60) * 360
      const minuteDegree = (getMinute / 60) * 360 + (getSecond / 60) * 6
      const hourDegree = (getHour / 12) * 360 + (getMinute / 60) * 30

      if (secondRef.current) {
        secondRef.current.style.transform = `rotate(${secondDegree}deg)`
      }
      if (minuteRef.current) {
        minuteRef.current.style.transform = `rotate(${minuteDegree}deg)`
      }
      if (hourRef.current) {
        hourRef.current.style.transform = `rotate(${hourDegree}deg)`
      }
    }

    setDate()
    const interval = setInterval(setDate, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl flex items-center justify-center border-4 border-slate-700">
      {/* Clock face markings */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-4 bg-slate-400 rounded-full"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-140px)`,
          }}
        />
      ))}

      {/* Hour numbers */}
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
        <span
          key={num}
          className="absolute text-slate-300 font-bold text-lg"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-110px) rotate(${-i * 30}deg)`,
          }}
        >
          {num}
        </span>
      ))}

      <div className="absolute w-4 h-4 bg-red-500 rounded-full z-50 shadow-lg" />

      {/* Hour */}
      <div
        ref={hourRef}
        className="absolute w-2 h-20 bg-gradient-to-t from-slate-300 to-white rounded-full origin-bottom transition-transform"
        style={{ bottom: '50%' }}
      />

      {/* Minute */}
      <div
        ref={minuteRef}
        className="absolute w-1.5 h-28 bg-gradient-to-t from-slate-400 to-slate-200 rounded-full origin-bottom transition-transform"
        style={{ bottom: '50%' }}
      />

      {/* Second */}
      <div
        ref={secondRef}
        className="absolute w-0.5 h-32 bg-red-500 rounded-full origin-bottom transition-transform"
        style={{ bottom: '50%' }}
      />
    </div>
  )
}

export default App
