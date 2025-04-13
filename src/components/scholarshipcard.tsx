// Example ScholarshipCard component with data fetching
import { useState, useEffect } from 'react';
const url = 'https://jefferyisaiahdavidmemorialfoundation.org/scholarships';

interface Scholarship {
    id: string;
    title: string;
    amount: string;
    deadline: string;
}

const ScholarshipCard = () => {

    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/scholarships');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json() as Scholarship[];
                setScholarships(data);
                setLoading(false);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className='bg-black-10'>
            {scholarships.map(scholarship => (
                <div key={scholarship.id} className='bg-blue-950 shadow-lg text-white rounded-lg p-10 w-200'>
                    <h2 className='text-lg font-bold'>{scholarship.title}</h2>
                    <p className='text-white'>Amount: {scholarship.amount}</p>
                    <p className='text-white'>Deadline: {scholarship.deadline}</p>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => window.open(url, '_blank')}  >Apply</button>
                </div>
            ))}
        </div>
    );
};

export default ScholarshipCard;