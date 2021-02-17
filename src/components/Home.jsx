import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Home() {
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/todos");
        }
    }, []);

    return (
        <>
            <section className="flex flex-col h-screen">
                <Navbar />
                <div className=" grid grid-cols-1 md:grid-cols-2 flex-grow bg-indigo-300">
                    <div className="self-center">
                        <p className="text-4xl text-center px-20">
                            Todo, Where you come to do!
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 self-center">
                        <button>
                            <Link to="/login">Log in</Link>
                        </button>
                        <button className="border-2 px-3 py-1 pb-2 ">
                            <Link to="/signup">Sign up</Link>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
