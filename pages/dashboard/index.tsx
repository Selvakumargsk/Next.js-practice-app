import { useEffect, useState } from "react";
import { getLayout } from "../components/layout";
import { signIn, getSession } from 'next-auth/react'

const Dashboard: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [sessiondata, setSessionData] = useState<any>(false);
    const [dashboardData, setData] = useState({
        name: "",
        posts: 0,
        likes: 0,
        followers: 0,
        following: 0,
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            const response = await fetch(`http://localhost:4000/dashboard`);
            const data = await response.json();
            setData(data);
            setLoading(false);
            const session: any = await getSession() ?? false;
            setSessionData(session)
        };
        fetchDashboardData();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    // console.log(sessiondata.user);
    

    // setTimeout(() => {
    //     if(sessiondata == false){
    //         signIn()
    //     }
    // }, 3000);
    

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-semibold text-center mb-4">Dashboard</h1>
                <div className="mb-4">
                    <p className="text-gray-600">
                        Name: <span className="text-gray-800 font-semibold">{dashboardData.name}</span>
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">
                        Posts: <span className="text-gray-800 font-semibold">{dashboardData.posts}</span>
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">
                        Likes: <span className="text-gray-800 font-semibold">{dashboardData.likes}</span>
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">
                        Followers: <span className="text-gray-800 font-semibold">{dashboardData.followers}</span>
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">
                        Following: <span className="text-gray-800 font-semibold">{dashboardData.following}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

(Dashboard as any).getLayout = getLayout


export default Dashboard;
