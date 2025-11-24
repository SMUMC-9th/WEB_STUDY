import { useState } from "react";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

export default function CartTabs() {
  const [tab, setTab] = useState<"list" | "summary">("list");

  return (
    <div className="w-full">
      <div className="flex border-b mb-4">
        <button
          onClick={() => setTab("list")}
          className={`flex-1 p-3 text-center ${
            tab === "list" ? "border-b-2 border-blue-600 font-semibold" : ""
          }`}
        >
          상품 리스트
        </button>

        <button
          onClick={() => setTab("summary")}
          className={`flex-1 p-3 text-center ${
            tab === "summary" ? "border-b-2 border-blue-600 font-semibold" : ""
          }`}
        >
          결제 요약
        </button>
      </div>

      {tab === "list" && <CartList />}
      {tab === "summary" && <CartFooter />}
    </div>
  );
}
