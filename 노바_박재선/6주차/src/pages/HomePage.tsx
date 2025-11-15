// import useGetLpList from "../hooks/queries/useGetLpList";
// import { useState } from "react";


// const HomePage = () => {
//     const [search, setSearch] = useState("");
//     const {data, isPending, isError} = useGetLpList({search});
    
//     if(isPending) {
//         return <div className={"mt-20"}>Loading..</div>
//     }

//     if(isError) {
//         return <div className={"mt-20"}>Error..</div>
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//             <img 
//                 className="w-32 h-32 relative animate-spin -top-7"
//                 src="/Lp_img_icon.png"
//             />
//             <h1 className="text-6xl font-bold">환영합니다</h1>
//             <p className="mt-4 text-2xl text-gray-500 animate-pulse">💽돌려돌려 LP판~</p>
//             <div className="mt-20">
//                 <input className="bg-white text-black" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="LP검색" />
//             </div>
//             {data?.data.data.map((lp)=> <h1>{lp.title}</h1>)}    
            
//         </div>

//     )
// }

// export default HomePage;


// import useGetLpList from "../hooks/queries/useGetLpList"; 
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import type { PaginationDto } from "../types/common";
// import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
// import { PAGINATION_ORDER } from "../enums/common";
// import {useInView} from "react-intersection-observer"

// type SortOrder = 'newest' | 'oldest';

// const HomePage = () => {
  // [유지] 데이터 로딩 로직
  // const [search, setSearch] = useState("");
  // const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // const apiOrderValue = sortOrder === 'newest'? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;

  // const {data, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(50, search, apiOrderValue);
  //UI state('newest')를 API가 이해하는 값이 ㄴDESC로 변경하는 과정
  // const params: PaginationDto = {
  //   order: apiOrderValue,
  //   limit: 50,
  //   search: search ? search : undefined,
  // }
  // const { data, isPending, isError } = useGetLpList(params);
  
  // const nav = useNavigate();

  //스크롤 감지를 위한 ref와 inView 상태
  // const {ref, inView} = useInView({
  //   threshold: 0,  ///0%만보여도 감지되도록 설정
  // });

  //inView상태 바뀌면 실행됨
  // useEffect(()=> {
  //   if (inView && hasNextPage && !isFetching) {
  //     fetchNextPage(); //다음페이지 요청함
  //   }
  // }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // if (isPending) {
  //   return <div className="p-8 text-white">Loading...</div>;
  // }
  // if (isError) {
  //   return <div className="p-8 text-red-500">Error..</div>;
  // }

  // console.log('전체 API 응답 (data):', data);
  // console.log('맵핑하려는 배열 (data.data.data):', data?.data.data);
  // if (data?.data.data && data.data.data.length > 0) {
  //   console.log('✅ 첫 번째 LP 객체의 키 (lp):', Object.keys(data.data.data[0]));
  // }

  // const activeStyle = "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
  // const inactiveStyle = "text-gray-400 hover:text-white cursor-pointer transition";

  // console.log(data);
  //무한스크롤 전 return문
  // return (
  //   <div className="relative bg-neutral-900 text-white p-8">
  //     <div className="flex justify-end space-x-4 mb-6">

  //       <button className={sortOrder === 'oldest' ? activeStyle : inactiveStyle} onClick={()=> setSortOrder('oldest')}>오래된순</button>
  //       <button className={sortOrder === 'newest' ? activeStyle : inactiveStyle} onClick={()=> setSortOrder('newest')}>최신순</button>
  //     </div>
  //     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">

  //       {data?.data.data.map((lp, index) => (
  //         <div key={lp.id || index} className="flex flex-col group cursor-pointer" onClick={()=>nav(`/lp/${lp.id}`)}>
  //           <div className="relative aspect-square w-full bg-neutral-800 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
  //             {lp.thumbnail ? (
  //               <img 
  //                 src={lp.thumbnail} 
  //                 alt={lp.title} 
  //                 className="w-full h-full object-cover" 
  //               />
  //             ) : (
  //               <div className="w-full h-full flex items-center justify-center text-gray-500">
  //                 [Image]
  //               </div>
  //             )}
  //             <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
  //               <div>
  //                 <h3 className="font-bold text-lg truncate">{lp.title}</h3>
  //                 <p className="text-sm text-gray-300">
  //                   {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '날짜 없음'}
  //                 </p>
  //               </div>
                
  //               <div className="text-right font-bold">
  //                 🤍 {lp.likes?.length || 0}
  //               </div>

  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
      
  //     <button
  //       onClick={() => nav('/new')}
  //       className="fixed bottom-10 right-10 w-13 h-13 bg-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-light shadow-lg hover:bg-pink-700 transition-colors cursor-pointer"
  //       aria-label="새 LP 추가"
  //     >
  //       +
  //     </button>
  //   </div>
  // );

  
// }

// export default HomePage;




import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList"; 
import { PAGINATION_ORDER } from "../enums/common"; 
import type { PaginationDto } from "../types/common"; 
import { useInView } from "react-intersection-observer"; 
import CardSkeleton from "../components/CardSkeleton";


type SortOrder = 'newest' | 'oldest';

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const nav = useNavigate();

  const apiOrderValue = sortOrder === 'newest' ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;

  const { 
    data, 
    // isFetching, 
    isFetchingNextPage,
    hasNextPage, 
    isPending, 
    fetchNextPage, 
    isError 
  } = useGetInfiniteLpList(
    50, // limit
    search, 
    apiOrderValue 
  );

  // 스크롤 감지를 위한 ref와 inView 상태
  //ref -> 특정한 HTML 요소를 감시할 수 있다.
  //inView ->  그요소가 화면에 보이면 true가 됨.
  // 감지할 요소가 0.1%만 보여도 감지함
  const { ref, inView } = useInView({threshold: 0.1, delay: 100});


  // inView상태가 바뀔 때마다 실행됨
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // 다음 페이지 데이터 요청
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // if (isPending) {
  //   return <div className="p-8 text-white">Loading...</div>;
  // }

  if (isError) {
    return <div className="p-8 text-red-500">Error.. 데이터를 불러오는 데 실패했습니다.</div>;
  }

  const activeStyle = "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
  const inactiveStyle = "text-gray-400 hover:text-white cursor-pointer transition";

  return (
    <div className="relative bg-neutral-900 text-white p-8">
      <div className="flex justify-end space-x-4 mb-6">
        <button 
          className={sortOrder === 'oldest' ? activeStyle : inactiveStyle} 
          onClick={()=> setSortOrder('oldest')}
        >
          오래된순
        </button>
        <button 
          className={sortOrder === 'newest' ? activeStyle : inactiveStyle} 
          onClick={()=> setSortOrder('newest')}
        >
          최신순
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {isPending ? (
          Array.from({length:12}).map((_,i) => <CardSkeleton key={`skel-${i}`}/>)
        ): (
            data?.pages.map((page, i) => (
              <React.Fragment key={i}> 
                {/* page.data.data가 LP[] 배열임 */}
                {page.data.data.map((lp, index) => (
                  <div 
                    key={lp.id || index} 
                    className="flex flex-col group cursor-pointer" 
                    onClick={()=>nav(`/lps/${lp.id}`)}
                  >
                    <div className="relative aspect-square w-full bg-neutral-800 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                      {lp.thumbnail ? (
                        <img 
                          src={lp.thumbnail} 
                          alt={lp.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          [Image]
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                        <div>
                          <h3 className="font-bold text-lg truncate">{lp.title}</h3>
                          <p className="text-sm text-gray-300">
                            {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '날짜 없음'}
                          </p>
                        </div>
                        <div className="text-right font-bold">
                          🤍 {lp.likes?.length || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
        )}
      </div>
        

      <div ref={ref} className="mt-6 w-full">
        {isFetchingNextPage && hasNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({length:6}).map((_,i) => <CardSkeleton key={`next-skel-${i}`}/>)}
          </div>
        )}
      </div>

      <button
        onClick={() => nav('/new')}
        className="fixed bottom-10 right-10 w-13 h-13 bg-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-light shadow-lg hover:bg-pink-700 transition-colors cursor-pointer"
        aria-label="새 LP 추가"
      >
        +
      </button>
    </div>
  );
}

export default HomePage;