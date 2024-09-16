const Hero = () => {
  return (
    <section className="bg-[#01a086] py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            🇩🇪에서 방 찾기 힘드시죠?
          </h1>
          <p className="my-4 text-xl text-white">
            알아요.. 그래도 우리 포기하지 맙시다!
          </p>
        </div>
        {/* <!-- Form Component --> */}
        <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">
              위치
            </label>
            <input
              type="text"
              id="location"
              placeholder="검색 키워드 입력"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <label htmlFor="property-type" className="sr-only">
              방 타입
            </label>
            <select
              id="property-type"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="All">전체</option>
              <option value="Zwischen">쯔비센</option>
              <option value="Nachmiete">나흐미터</option>
              <option value="Other">기타</option>
            </select>
          </div>
          <button
            type="submit"
            className="md:ml-4 mt-4 md:mt-0 w-full md:w-28 border px-6 py-3 rounded-lg bg-[#01a086] text-white hover:bg-[#01a086] focus:outline-none focus:ring focus:ring-blue-500"
          >
            검색
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
