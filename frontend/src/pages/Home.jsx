import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/80 bg-white/55 px-6 py-12 shadow-xl shadow-teal-950/5 backdrop-blur-xl sm:px-12 sm:py-16 lg:px-16">
        <div className="absolute -right-20 -top-28 -z-10 size-80 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 -z-10 size-96 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            <span className="size-2 rounded-full bg-teal-500" />
            Your campus community
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Lost something?
            <span className="block text-teal-700">Let’s bring it back.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            A helpful place for students to report lost belongings, share found
            items, and reconnect the campus community with what matters.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/report"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Report a lost item <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/found"
              className="inline-flex items-center justify-center rounded-full border border-teal-900/10 bg-white/75 px-6 py-3.5 text-sm font-semibold text-teal-900 transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-white"
            >
              I found something
            </Link>
          </div>
          {user && (
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/80 bg-white/65 px-4 py-3 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                {user.username?.charAt(0)?.toUpperCase()}
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Welcome back, {user.username}
                </span>
                <span className="block text-xs text-slate-500">{user.email}</span>
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-white/80 bg-white/65 p-6 shadow-lg shadow-teal-950/5 backdrop-blur-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            01 · Share
          </span>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Post a clear report
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add a title and helpful details so the right person can recognize
            their item.
          </p>
        </article>
        <article className="rounded-3xl border border-white/80 bg-white/65 p-6 shadow-lg shadow-teal-950/5 backdrop-blur-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            02 · Connect
          </span>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Browse campus posts
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Keep an eye on reports from fellow students and help reunite items
                with their owners.
          </p>
        </article>
        <article className="rounded-3xl border border-white/80 bg-white/65 p-6 shadow-lg shadow-teal-950/5 backdrop-blur-lg">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            03 · Reunite
          </span>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Make someone’s day
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            A small act of sharing can get an important everyday essential back
            where it belongs.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Home;
