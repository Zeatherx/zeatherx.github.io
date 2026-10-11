import { Compass, ShieldCheck, Users } from 'lucide-react'
import activitiesData from '../data/activities.json'

const ICONS = {
  'shield-check': ShieldCheck,
  users: Users,
  compass: Compass,
}

export default function Activities() {
  return (
    <section id="activities" className="w-full bg-slate-950 px-6 py-20 text-slate-100 sm:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-sky-400">03. ACTIVITIES</p>
          <h2 className="text-3xl font-medium text-white">Activities & Leadership</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {activitiesData.items.map((act) => {
          const Icon = ICONS[act.icon] || ShieldCheck
          return (
            <div key={`${act.organization}-${act.title}`} className="border-t border-slate-800/60 px-1 py-6 flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3 text-sky-400">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {act.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{act.title}</h3>
                <p className="mt-1 text-sm font-medium text-sky-400/90">{act.organization}</p>
                <p className="text-xs text-slate-500 mb-4">{act.period}</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                  {act.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}