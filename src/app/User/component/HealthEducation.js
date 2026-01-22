import "./HealthEducation.css";


export default function HealthEducation () {
    return (
        <div className="healthEducation_Card">

      <div className="healthEducation_container">

        <div className="description">
            <h2>How our bodies process medicine tablets</h2>
            <p>When you swallow a pill, it travels to your stomach where it dissolves. 
              The active medicine is then absorbed into your bloodstream, primarily through the intestines.
              Your blood carries the medicine throughout your body to reach its target, like a sore muscle or a headache. 
              Once it does its job, your liver and kidneys break down the used medicine, and it's finally removed from your body through your urine or feces.</p>
        </div>

        <div className="video-container">
          <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/uOcpsXMJcJk?si=EoCutVAYq6JsnsXB" 
          title="YouTube video player" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
          className="w-[97.09vw] md:w-[560px]"></iframe>
        </div>

      </div>

    </div>
    );
}
