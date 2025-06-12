import type { exerciseDetailsProps } from "../../Pages/Exercise Details Page/Exercise_Details";
import BodyPartImage from "../../assets/Icons/body-part.png";
import TargetImage from "../../assets/Icons/target.png";
import EquipmentImage from "../../assets/icons/equipment.png";
import type { exerciseProps } from "../HorizontalScrollbar Component/HorizontalScrollbar";

export default function Details({
  props,
  exercises
}: {
  props: exerciseDetailsProps;
  exercises: exerciseProps[];
}) {
  const { name, bodyPart, target, equipment } = props;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  const extraDetails = [
    {
      icon: BodyPartImage,
      name: bodyPart,
      name1: "bodyPart"
    },
    {
      icon: TargetImage,
      name: target,
      name1: "target"
    },
    {
      icon: EquipmentImage,
      name: equipment,
      name1: "equipment"
    }
  ];

  return (
    <>
      <div className="flex lg:flex-row xs:flex-col justify-around items-start overflow-hidden p-[20px] tracking-wider gap-[60px] lg:mt-16 xs:mt-10">
        <div className="lg:w-[44.2%] xs:w-full lg:bg-white">
          <img
            src={exercises.find((exercise) => exercise.name === name)?.gifUrl}
            alt={name}
            loading="lazy"
            className="lg:w-[729px] lg:h-[742px] md:h-[500px] xs:h-[450px] border-t-[3px] border-[var(--primary-color)] rounded-t-md mx-auto"
          />
        </div>

        <div className="lg:gap-[35px] xs:gap-[20px] lg:w-[45%] xs:w-full text-[var(--text-color)]">
          <h3 className="capitalize text-4xl font-semibold mb-10">{name}</h3>

          <h6 className="lg:w-[90%] xs:w-[100%] text-lg mb-10">
            Exercises keep you strong.{" "}
            <strong className="capitalize">{name}</strong> is one of the best
            exercises to target your{" "}
            <strong className="capitalize">{target}</strong>. It will help you
            improve your mood and gain energy.
          </h6>

          {extraDetails.map((icon, index) => (
            <div key={index} className="flex items-center gap-[20px] mb-10">
              <button
                type="button"
                title={
                  icon.name1 === "bodyPart"
                    ? "Body Part"
                    : icon.name1 === "target"
                    ? "Target"
                    : "Equipment"
                }
                className="w-[100px] h-[100px] rounded-full bg-[#fff2db] flex justify-center items-center outline-none focus:outline-none">
                <img
                  src={icon.icon}
                  alt={icon.name}
                  className="w-[50px] h-[50px] object-contain"
                />
              </button>
              <h5 className="text-2xl font-semibold capitalize ml-5">
                {icon.name}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
