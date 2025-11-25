import JiraInput from '@/components/JiraInput';

export default function Home() {
  return (
    <div className="gradient-bg flex min-h-screen flex-col items-center justify-center px-4">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        {/* Logo / Branding */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/25">
            <svg
              className="h-9 w-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            JIRA Refinement
          </h1>
          <p className="max-w-md text-lg text-slate-600 dark:text-slate-400">
            Prepare your JIRAs for sprint with the Definition of Ready checklist
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full rounded-2xl bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-slate-900/20 sm:p-8">
          <JiraInput />
        </div>

        {/* Features */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <svg
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">DoR Checklist</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive questionnaire
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Copy Ready</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              One-click copy output
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <svg
                className="h-5 w-5 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Fast & Simple</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Streamlined workflow
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Built for efficient JIRA refinement
      </footer>
    </div>
  );
}
