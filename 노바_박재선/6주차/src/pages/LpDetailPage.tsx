import {  useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { useInView } from "react-intersection-observer";
import useCreateLpComment from "../hooks/useCreateLpComments";

interface CommentSectionProps {
    lpid: string;
}

const CommentSection = ({lpid}: CommentSectionProps) => {
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const [commentText, setCommentText] = useState("");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
    } = useGetInfiniteLpComments(lpid, order);

    //댓글 추가 훅
    //isPending을 다른이름으로 지정해서 기존의 isPending하고 안겹치게함.
    const { mutate: createComment, isPending: isCreatingComment } = useCreateLpComment();


    const {ref, inView} = useInView({threshold: 0.5, delay: 100});

    useEffect(()=> {
        if(inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleSubmitComment = () => {
        if(commentText.trim().length === 0){
            alert("댓글을 입력하시오");
            return;
        }
        createComment(
            {lpid, content: commentText},
            {
                onSettled: () => {
                    setCommentText("");
                }
            }
        )
    }


    const activeStyle = "text-white font-semibold border-b-2 border-white pb-1 cursor-pointer transition";
    const inactiveStyle = "text-gray-400 hover:text-white cursor-pointer transition";

    return (
        <div className="mt-12 pt-8 border-t border-neutral-700">
            {/* 댓글타이틀 + 정렬 버튼 */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">댓글</h2>
                <div className="flex space-x-4">
                    <button
                        className={order === PAGINATION_ORDER.asc ? activeStyle : inactiveStyle}
                        onClick={()=>setOrder(PAGINATION_ORDER.asc)}
                    >
                        오래된순
                    </button>
                    <button
                        className={order === PAGINATION_ORDER.desc ? activeStyle : inactiveStyle}
                        onClick={()=>setOrder(PAGINATION_ORDER.desc)}
                    >
                        최신순
                    </button>
                </div>
            </div>

            {/* 댓글작성 폼UI */}
            <div className="flex gap-4 mb-8">
                <input 
                    placeholder="댓글을 입력해주세요"
                    value={commentText}
                    type="text"
                    onChange={(e)=>setCommentText(e.target.value)}
                    //댓글 생성중에는 입력을 비활성화함.
                    disabled={isCreatingComment}
                    className="flex-1 p-3 bg-neutral-700 rounded-md text-white placeholder-gray-400"
                />
                <button 
                    onClick={handleSubmitComment}
                    //댓글 생성할때는 입력 비활성화
                    disabled={isCreatingComment}
                    className="bg-neutral-600 text-white px-6 py-3 rounded-md hover:bg-pink-500  cursor-pointer tranisition hover:text-black transition"
                >
                    {isCreatingComment? "작성중입니다": "작성"}
                </button>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-6">
                {isPending ? (
                    <div className="text-center text-gray-500">Loading..</div>
                ): isError ? (
                    <div className="text-center text-red-600">Error..</div>
                ): (
                    data?.pages.map((page, i) => (
                        <React.Fragment key={i}>
                            {page.data.data.map((comment)=>(
                                <div key={comment.id} className="flex gap-4">
                                    <img
                                        src={comment.author.avatar || `https://placehold.co/48x48/303030/FFF?text=${comment.author.name[0]}`}
                                        alt={comment.author.name}
                                        className="w-12 h-12 rounded-full bg-neutral-600"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-white">{comment.author.name}</p>
                                        <p className="text-gray-300">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))
                )}
                
                {/* 무한 스크롤 트리;거 */}
                <div ref={ref} className="h-10">
                    {isFetchingNextPage && hasNextPage && "더 많은 댓글 로딩중.."}
                </div>
            </div>
        </div>
    )
}




const LpDetailPage = () => {
    const {lpid} = useParams();

    if(!lpid) {
        return <div className="p-8 text-white">잘못된 접근입니다.</div>
    }
    const {data, isPending, isError} = useGetLpDetail(lpid);

    if (isPending) {
        return <div className="p-8 text-white">Loading...</div>
    }

    if (isError) {
        return <div className="p-8 text-white">Error...</div>
    }

    const lp = data.data;

    return (
        <div className="relative bg-neutral-800 text-white max-w-3xl mx-auto my-12 p-18 rounded-lg shadow-xl">
            {/* 자성자, 작성일 */}
            <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                <span>{lp.author?.name || '작성자 정보 없음'}</span>
                <span>{lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '날짜 없음'}</span>
            </div>
            <div className="flex justify-between items-start mb-8">
                <h1 className="text-4xl font-bold flex-1">{lp.title}</h1>
                {/* 버튼들 */}
                <div className="flex gap-4 text-gray-400 flex-shrink-0 ml-4 mt-2">
                    <button className="hover:text-white cursor-pointer transition"><FaEdit size={20} /></button>
                    <button className="hover:text-white cursor-pointer transition"><FaTrash size={20} /></button>
                </div>
            </div>

            

            

            <div className="flex justify-center items-center my-10 relative w-full h-96">
                <div
                    className="absolute w-80 h-80 md:w-96 md:h-96 bg-[#303030] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform translate-x-1 translate-y-1"
                ></div>
                <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden animate-[spin_10s_linear_infinite] z-10 border-2 border-black">
                    <img 
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#cdcdcd] border-1 border-[#ababab]">
                        <div className="w-full h-full rounded-full shadow-inner"></div>
                    </div>
                </div>
                
                
            </div>

            <p className="text-lg text-gray-300 leading-relaxed mb-10 whitespace-pre-wrap">
                {lp.content}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
                {lp.tags?.map((tag) => (
                    <span key={tag.id} className="bg-neutral-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        #{tag.name}
                    </span>
                ))}
            </div>

            <div className="flex justify-center items-center gap-3">
                <button className="text-pink-500 hover:text-pink-400">
                    <FaHeart size={30}/>
                </button>
                <span className="text-2xl font-bold">{lp.likes?.length || 0}</span>
            </div>
            <CommentSection lpid={lpid}/>
        </div>
    )
}


export default LpDetailPage;