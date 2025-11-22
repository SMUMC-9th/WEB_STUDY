// 댓글 스켈레톤 UI 여러 개를 렌더링하는 컴포넌트
// 로딩 중일 때 실제 댓글 대신 보여짐

import CommentSkeleton from "./CommentSkeleton"; // 하나의 댓글 모양 스켈레톤 컴포넌트 import

// props로 몇 개를 렌더링할지 받아옴
// -> CommentSkeletonList 컴포넌트는 반드시 count라는 숫자 props를 받아야함을 명시
interface CommentSkeletonListProps {
  count: number; // 몇 개의 댓글 스켈레톤을 보여줄지 지정
}

const CommentSkeletonList = ({ count }: CommentSkeletonListProps) => {
  return (
    <>
      {/* count 만큼 배열을 만들고 map을 돌면서 스켈레톤 렌더링 */}
      {new Array(count).fill(0).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </>
  );
};

export default CommentSkeletonList;
