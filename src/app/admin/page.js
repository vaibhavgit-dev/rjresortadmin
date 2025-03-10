"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
    FaTachometerAlt,
    FaBox,
    FaUser,
    FaCalendarAlt,
    FaImage,
} from "react-icons/fa";
import Dashboard from "../components/dashboard/dashboard";
import Hotelrooms from "../components/hotelrooms/hotelrooms";
import Allpages from "../components/allpages/allpages";
import Bookings from "../components/bookings/bookings";
import Gallery from "../components/gallery/gallery";

const Page = () => {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Sidebar tabs
    const tabs = useMemo(
        () => [
            { name: "Dashboard", icon: <FaTachometerAlt /> },
            { name: "Hotel", icon: <FaBox /> },
            { name: "Pages", icon: <FaUser /> },
            { name: "Bookings", icon: <FaCalendarAlt /> },
            { name: "Gallery", icon: <FaImage /> },
        ],
        []
    );

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    // Handle tab click
    const handleTabClick = useCallback((tabName) => {
        setActiveTab(tabName);
    }, []);

    // Handle dropdown toggle
    const handleDropdownToggle = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Map activeTab to corresponding component
    const renderActiveTabContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return <Dashboard />;
            case "Hotel":
                return <Hotelrooms />;
            case "Pages":
                return <Allpages />;
            case "Bookings":
                return <Bookings />;
            case "Gallery":
                return <Gallery />;
            default:
                return <p>Unknown Tab</p>;
        }
    };

    // Conditional rendering based on session
    if (!session) {
        return <p>Access Denied</p>;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-black text-white flex flex-col">
                <div className="w-full flex justify-center p-4">
                    <img src="/logo3.png" width={100} height={100} alt="Logo" />
                </div>
                <nav className="flex-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => handleTabClick(tab.name)}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-700 focus:outline-none ${
                                activeTab === tab.name ? "bg-gray-700" : ""
                            }`}
                            aria-current={activeTab === tab.name ? "page" : undefined}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-gray-100 p-4 flex justify-between items-center shadow">
                    <h1 className="text-xl font-bold text-black">{activeTab}</h1>
                    <div className="flex items-center gap-4 relative dropdown-container">
                        {/* Profile Section */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={handleDropdownToggle}
                        >
                            <img
                                src={session.user.image || "/default-profile.png"}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full border-2 border-brown-500"
                            />
                            <span className="text-gray-700 font-medium">{session.user.name}</span>
                        </div>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-300 rounded shadow-md">
                                <button
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => alert("Edit Profile Clicked")}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => signOut()}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {renderActiveTabContent()}
                </main>
            </div>
        </div>
    );
};

export default Page;
