import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// 게시글 데이터 구조 정의
interface Post {
  id: number;
  title: string;
  body: string;
}

// 한 번에 가져올 데이터 개수 (페이지 크기)
const PAGE_SIZE = 10;

// 2. fetch 함수
async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );
  // 응답 실패 시 에러 처리
  if (!res.ok) throw new Error("네트워크 에러");
  // JSON 데이터를 Post[] 형태로 변환
  return (await res.json()) as Post[];
}

export default function InfinitePostsAutoJsonPlaceholder() {
  // 3. useInfiniteQuery 사용
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", PAGE_SIZE],
      queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
    });

  // 4. 센티널 요소를 참조하기 위한 ref
  // - useRef는 특정 DOM 요소를 직접 접근할 때 사용한다.
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 5. Intersection Observer 설정
  useEffect(() => {
    // 센티널 요소가 없으면 아무것도 안한다.
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    // IntersectionObserver 생성
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]; // 관찰 대상 중 첫 번째 entry (sentinel)

      // isIntersecting: 요소가 화면에 보이는가?
      // hasNextPage: 다음 페이지가 있는가?
      // ! isFetchingNextPage: 현재 로딩 중이 아닌가?
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); //조건을 만족하면 다음 페이지 불러오기
      }
    });

    // 센티널 요소 관찰 시작
    observer.observe(el);

    //컴포넌트가 언마운트되면 관찰 중지 - 메모리 누수 방지
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  // 의존성 배열: 이 값들이 바뀌면 useEffect가 다시 실행된다.

  // 6. 렌더링
  return (
    <div>
      {/* 페이지별로 쌓인 데이터를 순회하며 출력 */}
      {data?.pages.map((page, idx) => (
        <ul key={idx} style={{ marginBottom: 16 }}>
          {page.map((post) => (
            <li key={post.id}>
              <strong>{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      ))}
      {/* 7. 센티널 요소(스트롤 감지용) */}
      {/* 높이 1px의 보이지 않는 div 설정 */}
      <div ref={sentinelRef} style={{ height: 1, color: "red" }} />

      {/* 8. 상태 메시지 */}
      <div>
        {isFetchingNextPage
          ? "불러오는 중"
          : hasNextPage
          ? "아래로 스크롤하면 더 가져와요"
          : "이제 없어요 바보"}
      </div>
    </div>
  );
}
