import "./App.css";
import AppRoutes from "./router/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <AppRoutes />
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
}

export default App;
