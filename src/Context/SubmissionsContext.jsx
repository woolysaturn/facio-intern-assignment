import {createContext, useContext, useState} from "react";

const SubmissionsContext = createContext(null);

// Seed data for initial submissions state
const seedSubmissions = [
    {
        id: 1,
        businessName: 'Apex Consulting Group',
        activity: 'Consulting',
        annualRevenue: 250000,
        hasClaims: false,
        claims: '',
        status: 'Ready for Quotation',
        category: 'Request',
        messages: [],
    },
    {
        id: 2,
        businessName: 'Summit Manufacturing LLC',
        activity: 'Manufacturing',
        annualRevenue: 800000,
        hasClaims: true,
        claims: 'Pending loss run report from previous carrier.',
        status: 'In Review',
        category: 'Request',
        messages: [],
    }
]
// Submissions context provider component
export function SubmissionsProvider({children}) {
    const [submissions, setSubmissions] = useState(seedSubmissions);

    const addSubmission = (data) => {
        // Determine if the submission qualifies for auto-approval based on activity, revenue, and claims status
        const isAutoApproval = 
            ['Retail', 'Consulting'].includes(data.activity) &&
            data.annualRevenue <= 500000 &&
            !data.hasClaims;

        const initialStatus = isAutoApproval ? 'Ready for Quotation' : 'In Review';
        // Create the new submission object with initial status and empty messages array
        const newSub = {
            ...data,
            id: Date.now(),
            status: initialStatus,
            messages: [],
        }
        setSubmissions(prev => [newSub, ...prev])
    }
    // Update the status of a submission by its ID
    const updateStatus = (id, status) => {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s))
    }
    // Add a message to a submission by its ID
    const addMessage = (id, text, from, category = 'Request') => {
        setSubmissions(prev => prev.map(s => s.id === id ? { 
         ...s, 
         category, 
         messages: [...s.messages, { from, text, date: new Date().toLocaleDateString() }] 
        } : s))
    }
    // Provide the submissions context to child components
    return (
        <SubmissionsContext.Provider value={{ submissions, addSubmission, updateStatus, addMessage }}>
            {children}
        </SubmissionsContext.Provider>
    )
}
// Custom hook to use the submissions context
export function useSubmissions() {
    return useContext(SubmissionsContext);
}
