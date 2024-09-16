import { FaPaperPlane } from "react-icons/fa";
import { useFormState } from "react-dom";

const SubmitMessageButton = () => {
  const { pending } = useFormState();

  return (
    <button
      className="bg-[#01a086] hover:bg-[#01a086] text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
      type="submit"
      disabled={pending}
    >
      <FaPaperPlane className="mr-2" />
      {pending ? "전송 중..." : "메시지 보내기"}
    </button>
  );
};

export default SubmitMessageButton;
