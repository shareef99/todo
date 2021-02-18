import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Home() {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [quote, setQuote] = useState();

    const todoQuotes = [
        "Do today's work today or two days work tomorrow",
        "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
        "Either you run the day or the day runs you.",
        "Just one small positive thought in the morning can change your whole day",
        "Whether you think you can, or you think you can’t – you’re right.",
        "Do the hard jobs first. The easy jobs will take care of themselves.",
        "The future depends on what you do today.",
        "Don't wait. The time will never be just right.",
        "You don’t have to see the whole staircase, just take the first step.",
        "If I had eight hours to chop down a tree, I’d spend six hours sharpening my ax.",
        "It does not matter how slowly you go, so long as you do not stop.",
        "Just do it.",
        "An idiot with plan can beat the genius without plan.",
        "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.",
        "There are no shortcuts to any place worth going.",
        "Think of many things, do one.",
        "Once you have commitment, you need the discipline and hard work to get you there.",
        "There are two primary choices in life: to accept conditions as they exist, or accept the responsibility for changing them.",
        "As long as they are well-intentioned, mistakes are not a matter for shame, but for learning.",
        "Show me a person who has never made a mistake and I'll show you someone who has never achieved much.",
    ];

    useEffect(() => {
        if (currentUser) {
            history.push("/todos");
        }
    }, []);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 20);
        setQuote(todoQuotes[randomNumber]);
    }, []);

    return (
        <>
            <section className="flex flex-col h-screen bg-white">
                <Navbar />
                <div className="grid grid-cols-70 flex-grow  text-black">
                    <div className="h-full flex flex-col justify-center items-center md:w-4/5 max-w-9/10 m-auto">
                        <p className="text-4xl text-center">
                            Todo, Where you come to do!
                        </p>
                        <p className="text-lg mt-10 text-center tracking-wide md:w-1/2 font-medium">
                            <span className="text-4xl">&#10077;</span>
                            {quote}
                            {/* &#10078; */}
                        </p>
                    </div>
                    <div className="h-full flex flex-col items-center justify-center space-y-4">
                        <button>
                            <Link to="/login" className="text-lg font-medium">
                                Log in
                            </Link>
                        </button>
                        <button className="border px-3 py-1 rounded-md bg-white-light hover:bg-white transition duration-300 ease-in-out text-md font-medium">
                            <Link to="/signup">Sign up</Link>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
