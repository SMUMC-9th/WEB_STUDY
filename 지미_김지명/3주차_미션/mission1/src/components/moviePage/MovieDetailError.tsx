interface ErrorStates {
    message: string;
}

interface MovieDetailErrorProps {
    errorStates: ErrorStates;
    movieId?: string;
    onRetry: () => void;
    onGoHome: () => void;
    onGoBack: () => void;
}

export const MovieDetailError = ({ 
    errorStates, 
    movieId, 
    onRetry, 
    onGoHome, 
    onGoBack 
}: MovieDetailErrorProps) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg w-full">
                
                {/* 에러 아이콘 */}
                <div className="text-6xl mb-4">😵</div>
                
                {/* 에러 제목 */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    영화 정보를 불러올 수 없어요
                </h2>
                
                {/* 에러 설명 */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                    요청하신 영화를 찾을 수 없거나 일시적인 오류가 발생했습니다.
                </p>
                
                {/* 상세 에러 메시지 */}
                {errorStates.message && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-red-700 text-sm">
                            <strong>상세 오류:</strong> {errorStates.message}
                        </p>
                        {movieId && (
                            <p className="text-red-600 text-xs mt-2">
                                영화 ID: {movieId}
                            </p>
                        )}
                    </div>
                )}
                
                {/* 해결 방법 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-blue-800 mb-2">
                        해결 방법:
                    </h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                        <li>• 네트워크 연결을 확인해보세요</li>
                        <li>• 잠시 후 다시 시도해보세요</li>
                        <li>• 영화 ID가 올바른지 확인해보세요</li>
                    </ul>
                </div>
                
                {/* 버튼들 */}
                <div className="space-y-3">
                    <button 
                        onClick={onRetry}
                        className="w-full bg-[#dda5e3] text-white py-3 px-6 rounded-lg hover:bg-[#b2dab1] transition-all duration-200 font-medium"
                    >
                        다시 시도하기
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={onGoBack}
                            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                            뒤로 가기
                        </button>
                        <button 
                            onClick={onGoHome}
                            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                            홈으로
                        </button>
                    </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-4">
                    문제가 계속 발생하면 잠시 후 다시 시도해주세요
                </p>
            </div>
        </div>
    );
};