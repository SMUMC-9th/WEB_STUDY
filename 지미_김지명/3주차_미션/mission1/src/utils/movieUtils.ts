export const formatReleaseDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    });
};

export const getRelativeDateInfo = (dateString: string): string => {
    const today = new Date();
    const releaseDate = new Date(dateString);
    const diffTime = today.getTime() - releaseDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
        if (diffDays < 365) {
            return `${diffDays}일 전 개봉`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `${years}년 전 개봉`;
        }
    } else {
        return `${Math.abs(diffDays)}일 후 개봉 예정`;
    }
};

export const getStatusInKorean = (status: string): string => {
    const statusMap: Record<string, string> = {
        'Released': '개봉됨',
        'Post Production': '후반 작업 중',
        'In Production': '제작 중',
        'Planned': '기획 중',
        'Rumored': '제작 미정'
    };
    return statusMap[status] || status;
};

export const getLanguageInKorean = (languageCode: string): string => {
    const langMap: Record<string, string> = {
        'ko': '한국어',
        'en': '영어',
        'ja': '일본어',
        'zh': '중국어',
        'es': '스페인어',
        'fr': '프랑스어',
        'de': '독일어',
        'it': '이탈리아어',
        'pt': '포르투갈어',
        'ru': '러시아어',
        'ar': '아랍어',
        'hi': '힌디어'
    };
    return langMap[languageCode] || languageCode.toUpperCase();
};

export const getGenreColor = (genreName: string): string => {
    const colors: Record<string, string> = {
        '액션': 'from-red-500 to-red-600',
        '모험': 'from-orange-500 to-orange-600',
        '애니메이션': 'from-pink-500 to-pink-600', 
        '코미디': 'from-yellow-500 to-yellow-600',
        '범죄': 'from-gray-700 to-gray-800',
        '다큐멘터리': 'from-green-600 to-green-700',
        '드라마': 'from-blue-600 to-blue-700',
        '가족': 'from-teal-500 to-teal-600',
        '판타지': 'from-purple-500 to-purple-600',
        '역사': 'from-amber-600 to-amber-700',
        '공포': 'from-gray-800 to-black',
        '음악': 'from-indigo-500 to-indigo-600',
        '미스터리': 'from-slate-600 to-slate-700',
        '로맨스': 'from-rose-500 to-rose-600',
        'SF': 'from-cyan-500 to-cyan-600',
        '스릴러': 'from-red-700 to-red-800',
        '전쟁': 'from-stone-600 to-stone-700',
        '서부': 'from-yellow-700 to-yellow-800'
    };
    return colors[genreName] || 'from-[#b2dab1] to-[#dda5e3]';
};

export const getMainCast = (cast: any[]) => {
    return cast
        .filter(actor => actor.name && actor.character)
        .sort((a, b) => a.order - b.order)
        .slice(0, 12);
};

export const getMainCrew = (crew: any[]) => {
    const importantJobs = ['Director', 'Producer', 'Executive Producer', 'Writer', 'Screenplay', 'Music', 'Cinematography'];
    
    return crew
        .filter(person => importantJobs.some(job => person.job.includes(job)))
        .reduce((acc: any[], current: any) => {
            const existing = acc.find(p => p.name === current.name);
            if (existing) {
                existing.jobs.push(current.job);
            } else {
                acc.push({
                    ...current,
                    jobs: [current.job]
                });
            }
            return acc;
        }, [])
        .slice(0, 6);
};