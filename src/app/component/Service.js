import React from 'react'

export default function Service() {
  const serviceContent = {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but publishing software like Aldus PageMaker including versions of Lorem Ipsum..",
    linkText: "See more...",
  };

  const handleSeeMore = () => {
    console.log("See more clicked");
  };

  return (
    <article className="left-[1326px] absolute top-[2057px] w-[485px] [font-family:'Times_New_Roman-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
      <p>
        <span className="[font-family:'Times_New_Roman-Italic',Helvetica] italic">
          {serviceContent.description}
        </span>
        <span className="[font-family:'Times_New_Roman-Regular',Helvetica] font-normal text-black text-xl tracking-[0]">
          {" "}
        </span>
        <button
          onClick={handleSeeMore}
          className="[font-family:'Times_New_Roman-Bold',Helvetica] font-bold cursor-pointer hover:underline focus:outline-none focus:underline"
          aria-label="See more information about this service"
        >
          {serviceContent.linkText}
        </button>
      </p>
    </article>
  );
}
