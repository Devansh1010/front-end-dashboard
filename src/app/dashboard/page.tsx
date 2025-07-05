'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
    const [records, setRecords] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("/api/get-records");
                setRecords(res.data);
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setLoading(false);
            }
        };

        getData(); // 👈 Important: CALL the function
    }, []);

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">Medical Records</h1>

            {loading ? (
                <p>Loading...</p>
            ) : records ? (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto text-gray-800">
                    {JSON.stringify(records, null, 2)}
                </pre>
            ) : (
                <p>No records found.</p>
            )}
        </main>
    );
};

export default DashboardPage;
