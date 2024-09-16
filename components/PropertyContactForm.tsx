"use client";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import addMessage from "@/app/actions/addMessage";
import { toast } from "react-toastify";
import SubmitMessageButton from "./SubmitMessageButton";

const initialProperties = {
  submitted: false,
};

const PropertyContactForm = ({ property }: { property: any }) => {
  const { data: session } = useSession();

  const [state, formAction] = useFormState(addMessage, initialProperties);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.submitted) {
      toast.success("메시지가 성공적으로 전송되었습니다.");
    }
  }, [state]);

  if (state.submitted) {
    return (
      <p className="text-green-500 mb-4">메시지가 성공적으로 전송되었습니다.</p>
    );
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">방 관리자에게 문의</h3>
        <form action={formAction}>
          <input
            type="hidden"
            id="property"
            name="property"
            defaultValue={property._id}
          />
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={property.owner}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력하세요."
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요."
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              전화번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="전화번호를 입력하세요."
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              내용
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="body"
              name="body"
              placeholder="메시지 내용을 입력하세요."
            ></textarea>
          </div>
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
