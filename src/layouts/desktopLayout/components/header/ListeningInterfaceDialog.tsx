import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "../../../../components/ui/dialog";
import { MicIcon } from "../../../../Svgs";

interface ListeningInterfaceDialogProps {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    onClose: () => void;
}

const ListeningInterfaceDialog: React.FC<ListeningInterfaceDialogProps> = ({ setSearchQuery, onClose }) => {
    const [isListening, setIsListening] = useState(true);
    const [error, setError] = useState("");
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check if browser supports speech recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech recognition not supported");
            alert("Speech recognition is not supported in your browser");
            onClose();
            return;
        }

        // Initialize speech recognition
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            // Update search query with final results
            if (finalTranscript) {
                setSearchQuery(finalTranscript.trim());
            }
        };

        recognition.onerror = (event: any) => {
            if (event.error === 'no-speech') {
                setError("Didn't hear that. Try again.");
            } else if (event.error === 'not-allowed') {
                alert('Microphone access denied. Please allow microphone access.');
                onClose();
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        // Start listening
        recognition.start();
        recognitionRef.current = recognition;

        // Cleanup function
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [setSearchQuery, onClose]);

    const handleToggle = () => {
        if (recognitionRef.current) {
            if (isListening) {
                recognitionRef.current.stop();
                setIsListening(false);
            } else {
                recognitionRef.current.start();
                setIsListening(true);
            }
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="z-800 bg-[#1c1c1c] text-white border-none shadow-[0_0_20px_rgba(0,0,0,1)] max-w-md h-[300px] flex flex-col items-center justify-center gap-8">
                <div className="text-center">
                    {/* If there's an error, show it instead of listening text */}
                    {error ? (
                        <p className="text-lg font-medium">{error}</p>
                    ) : (
                        <p className="text-lg font-medium">
                            {isListening ? 'Listening...' : 'Microphone off. Try again.'}
                        </p>
                    )}
                </div>

                <div className="relative flex items-center justify-center w-40 h-40">
                    {/* Animated ripple rings - only show when listening and no error */}
                    {isListening && !error && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute w-20 h-20 bg-red-600/30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                            <div className="absolute w-28 h-28 bg-red-600/20 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }}></div>
                            <div className="absolute w-36 h-36 bg-red-600/10 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s' }}></div>
                        </div>
                    )}

                    {/* Center microphone button */}
                    <div
                        onClick={handleToggle}
                        className={`relative w-20 h-20 ${isListening && !error ? 'bg-red-600' : 'bg-[#717171]'
                            } rounded-full flex items-center justify-center ${isListening && !error
                                ? 'shadow-[0_0_25px_rgba(239,68,68,0.6)]'
                                : 'shadow-[0_0_15px_rgba(75,85,99,0.6)]'
                            } hover:scale-105 transition-all duration-200 cursor-pointer z-10`}
                    >
                        <MicIcon width="30" height="30" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ListeningInterfaceDialog;