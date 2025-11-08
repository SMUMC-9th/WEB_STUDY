// 모달 팝업 창이 기존 HTML 레이아웃(디자인 요소)을 건드리지 않도록 분리해서 렌더링

import ReactDom from "react-dom"; // ReactDOM 모듈에서 createPortal 함수를 가져옴

// Portal 컴포넌트 정의: children을 받아서 별도의 DOM 노드에 렌더링함
const Portal = ({ children }: { children: React.ReactNode }) => {
  // 1. 모달이 렌더링될 DOM 요소를 가져옴
  const modalRoot = document.getElementById("modal-root");

  // 2. 만약 modal-root 요소가 없으면 아무것도 렌더링하지 않음 (에러 방지용)
  if (!modalRoot) {
    return null;
  }

  // 3. children 요소를 modalRoot 요소에 포탈 방식으로 렌더링함
  return ReactDom.createPortal(children, modalRoot);
};

export default Portal;
