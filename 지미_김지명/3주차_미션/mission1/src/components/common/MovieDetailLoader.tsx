import { LoadingSpinner } from "../common/LoadingSpinner";

interface LoadingStates {
    movieDetail: boolean;
    credits: boolean;
    overall: boolean;
}

interface MovieDetailLoaderProps {
    loadingStates: LoadingStates;
    movieTitle?: string;
}

export const MovieDetailLoader = ({ loadingStates, movieTitle }: MovieDetailLoaderProps) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
                {/* 로딩 스피너 */}
                <div className="flex justify-center mb-6">
                    <LoadingSpinner />
                </div>
                
                {/* 로딩 제목 */}
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                    🎬 영화 정보 로딩 중...
                </h2>
                
                {/* 영화 제목 */}
                {movieTitle && (
                    <p className="text-gray-600 mb-4">
                        "{movieTitle}" 정보를 불러오고 있어요
                    </p>
                )}
                
                {/* 로딩 단계 */}
                <div className="space-y-3 mb-6">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${
                        !loadingStates.movieDetail ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                        <div className="flex items-center">
                            <span className="mr-2">📽️</span>
                            <span>영화 상세 정보</span>
                        </div>
                        <div>
                            {loadingStates.movieDetail ? (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <span className="text-green-500">✅</span>
                            )}
                        </div>
                    </div>
                    
                    <div className={`flex items-center justify-between p-3 rounded-lg ${
                        !loadingStates.credits ? 'bg-green-50 text-green-700' : 
                        loadingStates.credits ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'
                    }`}>
                        <div className="flex items-center">
                            <span className="mr-2">👥</span>
                            <span>출연진 정보</span>
                        </div>
                        <div>
                            {loadingStates.credits ? (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : !loadingStates.overall ? (
                                <span className="text-green-500">✅</span>
                            ) : (
                                <span className="text-gray-400">⏳</span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* 로딩 메시지 */}
                <p className="text-sm text-gray-500">
                    잠시만 기다려주세요...
                </p>
            </div>
        </div>
    );
};