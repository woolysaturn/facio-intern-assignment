import { useState } from 'react'
import { useSubmissions } from "../context/SubmissionsContext";

export default function ReviewerPortal() {
    const { submissions, updateStatus, addMessage } = useSubmissions()
    const [activeTab, setActiveTab] = useState('Request')
    const [replyText, setReplyText] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    const filtered = submissions.filter(s => s.category === activeTab)

    const handleAction = (id, newStatus, message) => {
        updateStatus(id, newStatus)
        if (message) {
            addMessage(id, message, 'Small Business Reviewer', activeTab)
        }
        setSelectedId(null)
        setReplyText('')
    }

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {['Request', 'Question', 'Comment', 'Other'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            activeTab === tab 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        {tab}s ({submissions.filter(s => s.category === tab).length})
                    </button>
                ))}
            </div>

            {/* Ticket List */}
            <div className="grid gap-4">
                {filtered.length === 0 ? (
                    <p className="text-sm text-slate-500 py-8 text-center bg-white rounded-xl border border-slate-200">
                        No {activeTab.toLowerCase()} tickets found.
                    </p>
                ) : (
                    filtered.map(s => (
                        <div key={s.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-slate-900 text-lg">{s.businessName}</h3>
                                    <p className="text-sm text-slate-500">
                                        Activity: <span className="font-medium text-slate-700">{s.activity}</span> | 
                                        Revenue: <span className="font-medium text-slate-700">${s.annualRevenue?.toLocaleString()}</span>
                                    </p>
                                </div>
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                    s.status === 'Ready for Quotation' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                    {s.status}
                                </span>
                            </div>

                            {s.claims && (
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700">
                                    <span className="font-semibold text-slate-900">Submitted Notes / Claims:</span> {s.claims}
                                </div>
                            )}

                            {/* Communication Thread */}
                            {s.messages && s.messages.length > 0 && (
                                <div className="space-y-2 border-t border-slate-100 pt-3">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Communication Log</p>
                                    {s.messages.map((m, idx) => (
                                        <div key={idx} className="bg-indigo-50/50 p-2.5 rounded-lg text-xs text-slate-700 border border-indigo-100">
                                            <span className="font-semibold text-indigo-900">{m.from}:</span> {m.text}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Action Controls */}
                            <div className="border-t border-slate-100 pt-4 space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => handleAction(s.id, 'Ready for Quotation', 'Request approved and marked ready for quotation.')}
                                        className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-500 shadow-sm"
                                    >
                                        ✓ Ready for Quotation
                                    </button>
                                    <button 
                                        onClick={() => setSelectedId(selectedId === s.id ? null : s.id)}
                                        className="px-3 py-1.5 text-xs font-medium bg-amber-600 text-white rounded-md hover:bg-amber-500 shadow-sm"
                                    >
                                        * Request Additional Info *
                                    </button>
                                    <button 
                                        onClick={() => setSelectedId(selectedId === s.id ? null : s.id)}
                                        className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-500 shadow-sm"
                                    >
                                        * Clarify Business Activity *
                                    </button>
                                </div>

                                {selectedId === s.id && (
                                    <div className="flex gap-2 pt-2">
                                        <input 
                                            type="text" 
                                            placeholder="Type your review note or inquiry for the broker..."
                                            className="flex-1 rounded-md border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={replyText}
                                            onChange={e => setReplyText(e.target.value)}
                                        />
                                        <button 
                                            onClick={() => handleAction(s.id, 'Info Requested', replyText)}
                                            className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800"
                                        >
                                            * Send to Broker *
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}