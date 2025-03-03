import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings({ userName, setUserName }) {
    const handleChange = (event) => {
        setUserName(event.target.value); 
    };
    return (
        <div>
            <h2>Account settings</h2>
            <label>
                Username 
                <input type="text" value={userName} onChange={handleChange} />
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </div>
    );
}
