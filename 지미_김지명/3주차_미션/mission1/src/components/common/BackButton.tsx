import React from 'react';

interface BackButtonProps {
    onGoBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onGoBack }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
            <div className="container mx-auto">
                <button 
                    onClick={onGoBack}
                    className="flex items-center px-4 py-2 bg-[#dda5e3] text-white rounded-lg hover:bg-[#b2dab1] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <span className="mr-2">←</span>
                    뒤로 가기
                </button>
            </div>
        </div>
    );
};