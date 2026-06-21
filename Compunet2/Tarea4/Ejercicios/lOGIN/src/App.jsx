import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';

export default function App() {
    return (
        <AuthProvider>
            <Login />
        </AuthProvider>
    );
}