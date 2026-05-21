import { useNavigate } from "react-router";

export default function DashboardPage() {
    const navigate = useNavigate();

    return <>
        <h1>Dashboard Page</h1>

        <button onClick={() => {
            localStorage.removeItem('adminToken');

            navigate('/login');
        }}>Log Out</button>
    </>
}
