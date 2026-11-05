import { useState } from "react";
import { useSubmissions } from "../context/SubmissionsContext";

const ACTIVITIES = ['Retail', 'Consulting', 'Manufacturing', 'Transportation', 'Construction', 'Hospitality', 'Technology', 'Other']
// List of possible business activities
export default function BrokerPortal() {
    const { submissions, addSubmission } = useSubmissions()
    const [form, setForm] = useState({
        businessName: '',
        activity: '',
        annualRevenue: '',
        hasClaims: false,
        claims: '',
        category: 'Request',
        infoLater: false,
    })
    // Handle form submission for new insurance request
    const handleSubmit = (e) => {
        e.preventDefault()
        addSubmission({
        ...form,
        annualRevenue: Number(form.annualRevenue),
        })
        setForm({ businessName: '', activity: '', annualRevenue: '', hasClaims: false, claims: '', category: 'Request', infoLater: false })
    }
    // Render the broker portal page with submission form and list of submissions
    return (
        <div className="grid gap-8 lg:grid-cols-2">
        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">New Insurance Request</h2>
            {/* Business Name Input Field */}
            <div>
            <label className="block text-sm font-medium text-slate-700">Business Name</label>
            <input required type="text" className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm" value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} placeholder="e.g. Oakridge Cafe" />
            </div>
            {/* Business Activity Input Field */}
            <div>
            <label className="block text-sm font-medium text-slate-700">Business Activity</label>
            <select required className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm" value={form.activity} onChange={e => setForm({...form, activity: e.target.value})}>
                <option value="">Select activity...</option>
                {ACTIVITIES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            </div>

            {/* Annual Revenue Input Field */}  
            <div>
            <label className="block text-sm font-medium text-slate-700">Annual Revenue (USD)</label>
            <input required type="number" min="0" className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm" value={form.annualRevenue} onChange={e => setForm({...form, annualRevenue: e.target.value})} placeholder="500000" />
            </div>
            {/* Ticket Category Input Field */}
            <div>
            <label className="block text-sm font-medium text-slate-700">Ticket Category</label>
            <select className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="Request">Request</option>
                <option value="Question">Question</option>
                <option value="Comment">Comment</option>
                <option value="Other">Other</option>
            </select>
            </div>
            {/* Insurance Claims Checkbox */}
            <div className="flex items-center gap-2">
            <input type="checkbox" id="claims" className="h-4 w-4 rounded border-slate-300" checked={form.hasClaims} onChange={e => setForm({...form, hasClaims: e.target.checked})} />
            <label htmlFor="claims" className="text-sm font-medium text-slate-700">Insurance claims in past 3 years?</label>
            </div>
            {/* Claims Description / Pending Date Textarea */}
            {form.hasClaims && (
            <div>
                <label className="block text-sm font-medium text-slate-700">Claims Description / Pending Date</label>
                <textarea rows={2} className="mt-1 w-full rounded-md border border-slate-300 p-2 text-sm" value={form.claims} onChange={e => setForm({...form, claims: e.target.value})} placeholder="Describe claims or note: 'Will provide details by [Date]'" />
            </div>
            )}
            {/* Provide Missing Information Checkbox */}
            <div className="flex items-center gap-2">
            <input type="checkbox" id="later" className="h-4 w-4 rounded border-slate-300" checked={form.infoLater} onChange={e => setForm({...form, infoLater: e.target.checked})} />
            <label htmlFor="later" className="text-sm font-medium text-slate-700">I will provide missing supporting information at a later date</label>
            </div>

            <button type="submit" className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500">Submit Request</button>
        </form>

        {/* Status Tracker */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Your Submitted Tickets</h2>
            <div className="space-y-3">
            {submissions.map(s => (
                <div key={s.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">{s.businessName}</span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    s.status === 'Ready for Quotation' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>{s.status}</span>
                </div>
                <p className="text-xs text-slate-500">{s.activity} · ${s.annualRevenue?.toLocaleString()} · <span className="font-medium text-indigo-600">{s.category}</span></p>
                {s.claims && <p className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">Claims/Notes: {s.claims}</p>}
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}
