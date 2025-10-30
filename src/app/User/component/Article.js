import React from 'react'

export default function Article() {
return (
    <article className="absolute top-[2061px] left-[94px] w-[485px] [font-family:'Times_New_Roman-Regular',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal]">
      <p>
        <span className="[font-family:'Times_New_Roman-Italic',Helvetica] italic">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&#39;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but publishing software like Aldus PageMaker
          including versions of Lorem Ipsum..
        </span>
        <span className="[font-family:'Times_New_Roman-Regular',Helvetica] font-normal text-black text-xl tracking-[0]">
          &nbsp;
        </span>
        <a
          href="#"
          className="[font-family:'Times_New_Roman-Bold',Helvetica] font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label="Read more about this health article"
        >
          See more...
        </a>
      </p>
    </article>
  );
}
