import { ShieldAlert, Lock, Download } from 'lucide-react';

export default function QuestionPapersPage({
  papers,
  isPaperAdminUnlocked,
  securePaperCode,
  setSecurePaperCode,
  securityError,
  setIsPaperAdminUnlocked,
  handleUnlockQuestionPapers,
  handleApprovePaper,
}) {
  return (
    <div className="space-y-6">
      {!isPaperAdminUnlocked ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm max-w-md mx-auto p-8 text-center my-12">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
            <Lock size={32} />
          </div>
          <h4 className="font-bold text-slate-900 text-lg">Secure Administrator Credentials Needed</h4>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            This module holds examination papers uploaded by faculty. Access requires secure security clearances.
          </p>

          <form onSubmit={handleUnlockQuestionPapers} className="space-y-4">
            <div>
              <label className="block text-left text-xs font-bold text-slate-400 mb-1.5">ENTER PASSCODE</label>
              <input
                type="password"
                placeholder="••••••••"
                value={securePaperCode}
                onChange={(event) => setSecurePaperCode(event.target.value)}
                className="w-full px-3.5 py-2 text-center text-sm rounded-lg border border-slate-200 bg-slate-50 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {securityError && <p className="text-[11px] text-red-600 font-semibold">{securityError}</p>}

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left text-[11px] text-slate-400 space-y-1">
              <p className="font-bold text-slate-600">Demo Passcode Help:</p>
              <p>Use passcode <code className="font-mono bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-bold">admin123</code> to gain entry.</p>
            </div>

            <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-red-950/20">
              Authenticate Safe Vault
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-600" size={18} />
              <div className="text-xs">
                <span className="font-bold text-red-800">Secure Protocol Active:</span> IP logged. Do not distribute these assets. All downloads are watermarked.
              </div>
            </div>
            <button
              onClick={() => {
                setIsPaperAdminUnlocked(false);
                setSecurePaperCode('');
              }}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-800 font-bold px-3 py-1 rounded transition-colors"
            >
              Lock Vault
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Teacher Uploaded Examination Question Papers</h4>
                <p className="text-xs text-slate-500">Review, approve draft schemas, or reject papers that do not meet guidelines</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded text-xs border border-emerald-200">ADMIN LEVEL 1</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                    <th className="px-6 py-4">Paper ID / Code</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Target Grade</th>
                    <th className="px-6 py-4">Creator</th>
                    <th className="px-6 py-4">Exam Type</th>
                    <th className="px-6 py-4">Uploaded</th>
                    <th className="px-6 py-4">Secure Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {papers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-slate-50/80 transition-all">
                      <td className="px-6 py-3.5">
                        <span className="font-bold text-slate-900">{paper.id}</span>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{paper.code}</div>
                      </td>
                      <td className="px-6 py-3.5 font-bold text-indigo-900">{paper.subject}</td>
                      <td className="px-6 py-3.5">
                        <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[11px]">{paper.class}</span>
                      </td>
                      <td className="px-6 py-3.5 font-medium text-slate-700">{paper.creator}</td>
                      <td className="px-6 py-3.5 text-slate-600">{paper.examType}</td>
                      <td className="px-6 py-3.5 font-mono text-slate-400">{paper.uploadedOn}</td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${paper.secureStatus === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : paper.secureStatus === 'Pending Review' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' : 'bg-slate-100 text-slate-800'}`}>
                          {paper.secureStatus}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5">
                        {paper.secureStatus !== 'Approved' && (
                          <button
                            onClick={() => handleApprovePaper(paper.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded text-[10px] transition-all"
                          >
                            Approve
                          </button>
                        )}
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded text-[10px] inline-flex items-center gap-1 transition-all">
                          <Download size={11} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
