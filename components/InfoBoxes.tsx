import InfoBox from "./InfoBox";

export interface ButtonInfo {
  text: string;
  link: string;
  backgroundColor: string;
}

const InfoBoxes = () => {
  return (
    <section>
      <div className=" container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="살 곳을 찾으시는 분"
            buttonInfo={{
              text: "남들보다 빠르게 올라온 방 보기",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            괜찮아요. 울지 말고 다시 한번 방을 찾아볼까요?
          </InfoBox>
          <InfoBox
            heading="방을 내 놓는 분"
            backgroundColor="bg-[#01a08647]"
            buttonInfo={{
              text: "방 올리기",
              link: "/properties/add",
              backgroundColor: "bg-[#01a086]",
            }}
          >
            감사합니다! 많은 사람들이 방을 찾고 있습니다! 어서 방을 내
            놓아보세요!
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
